import { Client, GatewayIntentBits } from 'discord.js';
import * as cheerio from 'cheerio';
import fetch from 'node-fetch';
import pkg from 'pg';
const { Pool } = pkg;

const DISCORD_BOT_TOKEN = process.env.DISCORD_BOT_TOKEN;
const DATABASE_URL = process.env.DATABASE_URL;

if (!DISCORD_BOT_TOKEN) {
  console.error('❌ DISCORD_BOT_TOKEN manquant! Veuillez configurer le token de votre bot Discord.');
  process.exit(1);
}

if (!DATABASE_URL) {
  console.error('❌ DATABASE_URL manquant! La base de données doit être configurée.');
  process.exit(1);
}

const pool = new Pool({
  connectionString: DATABASE_URL,
});

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

async function checkBlacklist(compte) {
  try {
    const result = await pool.query(
      'SELECT * FROM blacklist WHERE compte = $1',
      [compte]
    );
    return result.rows.length > 0 ? result.rows[0] : null;
  } catch (error) {
    console.error('❌ Erreur lors de la vérification de la blacklist:', error);
    return null;
  }
}

async function addToBlacklist(compte, raison, auteur) {
  try {
    await pool.query(
      'INSERT INTO blacklist (compte, raison, auteur) VALUES ($1, $2, $3) ON CONFLICT (compte) DO NOTHING',
      [compte, raison, auteur]
    );
    return true;
  } catch (error) {
    console.error('❌ Erreur lors de l\'ajout à la blacklist:', error);
    return false;
  }
}

async function removeFromBlacklist(compte) {
  try {
    const result = await pool.query(
      'DELETE FROM blacklist WHERE compte = $1',
      [compte]
    );
    return result.rowCount > 0;
  } catch (error) {
    console.error('❌ Erreur lors de la suppression de la blacklist:', error);
    return false;
  }
}

async function getAllBlacklisted() {
  try {
    const result = await pool.query(
      'SELECT * FROM blacklist ORDER BY date_ajout DESC'
    );
    return result.rows;
  } catch (error) {
    console.error('❌ Erreur lors de la récupération de la blacklist:', error);
    return [];
  }
}

async function getAnkamaProfile(compte) {
  try {
    const url = `https://account.ankama.com/fr/profil-ankama/${compte}/dofustouch`;
    const response = await fetch(url);
    
    if (!response.ok) {
      return { success: false, error: 'Profil non trouvé' };
    }
    
    const html = await response.text();
    const $ = cheerio.load(html);
    
    const htmlLower = html.toLowerCase();
    if (htmlLower.includes('profil introuvable') || htmlLower.includes('n\'existe pas')) {
      return { success: false, error: 'Profil non trouvé' };
    }
    
    const characters = [];
    
    $('table tbody tr').each((i, element) => {
      const cells = $(element).find('td');
      if (cells.length >= 4) {
        const name = $(cells[0]).text().trim();
        const classe = $(cells[1]).text().trim();
        const level = $(cells[2]).text().trim();
        const server = $(cells[3]).text().trim();
        const guildElement = $(cells[4]).text().trim();
        
        characters.push({
          name: name || 'Inconnu',
          classe: classe || 'Inconnu',
          level: level || '?',
          server: server || 'Inconnu',
          guild: guildElement || 'Aucune guilde'
        });
      }
    });
    
    return { success: true, characters, url };
  } catch (error) {
    console.error('❌ Erreur lors de la récupération du profil:', error);
    return { success: false, error: error.message };
  }
}

client.once('ready', () => {
  console.log(`✅ Bot connecté en tant que ${client.user.tag}`);
  console.log('🤖 Bot Discord prêt! Tapez un nom de compte Ankama (ex: Midnighto-6615) pour obtenir les infos des personnages.');
});

client.on('messageCreate', async (message) => {
  if (message.author.bot) return;
  
  const content = message.content.trim();
  
  if (content.startsWith('!blacklist ')) {
    const args = content.slice(11).trim();
    const ankamaPattern = /^([a-zA-Z0-9_]+)-(\d{1,5})\s+(.+)$/;
    const match = args.match(ankamaPattern);
    
    if (!match) {
      await message.reply({
        content: '❌ Format incorrect! Utilisez: `!blacklist Nom-1234 Raison de la blacklist`'
      });
      return;
    }
    
    const compte = `${match[1]}-${match[2]}`;
    const raison = match[3];
    const auteur = `${message.author.username}#${message.author.discriminator}`;
    
    const existing = await checkBlacklist(compte);
    if (existing) {
      await message.reply({
        content: `⚠️ Le compte \`${compte}\` est déjà blacklisté!\n**Raison:** ${existing.raison}\n**Par:** ${existing.auteur}`
      });
      return;
    }
    
    const success = await addToBlacklist(compte, raison, auteur);
    if (success) {
      await message.reply({
        content: `🚫 **Compte blacklisté avec succès!**\n\n📋 Compte: \`${compte}\`\n⚠️ Raison: ${raison}\n👤 Par: ${auteur}`
      });
      console.log(`🚫 Compte blacklisté: ${compte} par ${auteur}`);
    } else {
      await message.reply({
        content: '❌ Erreur lors de l\'ajout à la blacklist.'
      });
    }
    return;
  }
  
  if (content === '!blacklist-list') {
    const blacklisted = await getAllBlacklisted();
    
    if (blacklisted.length === 0) {
      await message.reply({
        content: '✅ Aucun compte blacklisté pour le moment.'
      });
      return;
    }
    
    let response = `🚫 **Liste des comptes blacklistés** (${blacklisted.length} total)\n\n`;
    
    blacklisted.forEach((entry, index) => {
      const date = new Date(entry.date_ajout).toLocaleDateString('fr-FR');
      response += `**${index + 1}. ${entry.compte}**\n`;
      response += `   └ Raison: ${entry.raison}\n`;
      response += `   └ Par: ${entry.auteur} (${date})\n\n`;
    });
    
    if (response.length > 1900) {
      const chunks = [];
      let current = `🚫 **Liste des comptes blacklistés** (${blacklisted.length} total)\n\n`;
      
      blacklisted.forEach((entry, index) => {
        const date = new Date(entry.date_ajout).toLocaleDateString('fr-FR');
        const entryText = `**${index + 1}. ${entry.compte}**\n   └ Raison: ${entry.raison}\n   └ Par: ${entry.auteur} (${date})\n\n`;
        
        if ((current + entryText).length > 1900) {
          chunks.push(current);
          current = entryText;
        } else {
          current += entryText;
        }
      });
      
      if (current.length > 0) chunks.push(current);
      
      await message.reply({ content: chunks[0] });
      for (let i = 1; i < chunks.length; i++) {
        await message.channel.send({ content: chunks[i] });
      }
    } else {
      await message.reply({ content: response });
    }
    return;
  }
  
  if (content.startsWith('!blacklist-remove ')) {
    const compte = content.slice(18).trim();
    const ankamaPattern = /^([a-zA-Z0-9_]+)-(\d{1,5})$/;
    
    if (!ankamaPattern.test(compte)) {
      await message.reply({
        content: '❌ Format incorrect! Utilisez: `!blacklist-remove Nom-1234`'
      });
      return;
    }
    
    const existing = await checkBlacklist(compte);
    if (!existing) {
      await message.reply({
        content: `❌ Le compte \`${compte}\` n'est pas dans la blacklist.`
      });
      return;
    }
    
    const success = await removeFromBlacklist(compte);
    if (success) {
      await message.reply({
        content: `✅ Le compte \`${compte}\` a été retiré de la blacklist.`
      });
      console.log(`✅ Compte retiré de la blacklist: ${compte}`);
    } else {
      await message.reply({
        content: '❌ Erreur lors de la suppression de la blacklist.'
      });
    }
    return;
  }
  
  const ankamaPattern = /^([a-zA-Z0-9_]+)-(\d{1,5})$/;
  const match = content.match(ankamaPattern);
  
  if (match) {
    const compte = match[0];
    
    try {
      await message.channel.sendTyping();
      
      const blacklistEntry = await checkBlacklist(compte);
      
      const profileData = await getAnkamaProfile(compte);
      
      if (!profileData.success) {
        await message.reply({
          content: `❌ Impossible de récupérer le profil de \`${compte}\`.\nVérifiez que le nom du compte est correct.`
        });
        return;
      }
      
      if (profileData.characters.length === 0) {
        let response = `🔍 **Profil Ankama Dofus Touch**\n\n📋 Compte: \`${compte}\`\n🔗 Lien: ${profileData.url}\n\n⚠️ Aucun personnage trouvé sur ce compte.`;
        
        if (blacklistEntry) {
          response += `\n\n🚫 **⚠️ ATTENTION - COMPTE BLACKLISTÉ!**\n**Raison:** ${blacklistEntry.raison}\n**Blacklisté par:** ${blacklistEntry.auteur}`;
        }
        
        await message.reply({ content: response });
        return;
      }
      
      let warningMessage = '';
      if (blacklistEntry) {
        warningMessage = `\n\n🚫 **⚠️ ATTENTION - COMPTE BLACKLISTÉ!**\n**Raison:** ${blacklistEntry.raison}\n**Blacklisté par:** ${blacklistEntry.auteur}\n\n`;
      }
      
      const header = `🔍 **Profil Ankama Dofus Touch**\n\n📋 Compte: \`${compte}\`\n🔗 Lien: ${profileData.url}${warningMessage}\n👥 **Personnages:** (${profileData.characters.length} trouvé(s))\n\n`;
      
      let messages = [];
      let currentMessage = header;
      
      profileData.characters.forEach((char, index) => {
        const charInfo = `**${index + 1}. ${char.name}**\n   └ Classe: ${char.classe} | Niveau: ${char.level}\n   └ Serveur: ${char.server}\n   └ Guilde: ${char.guild}\n\n`;
        
        if ((currentMessage + charInfo).length > 1900) {
          messages.push(currentMessage);
          currentMessage = charInfo;
        } else {
          currentMessage += charInfo;
        }
      });
      
      if (currentMessage.length > 0) {
        messages.push(currentMessage);
      }
      
      await message.reply({ content: messages[0] });
      
      for (let i = 1; i < messages.length; i++) {
        await message.channel.send({ content: messages[i] });
      }
      
      const blacklistStatus = blacklistEntry ? ' [BLACKLISTÉ]' : '';
      console.log(`✅ Profil récupéré pour: ${compte} (${profileData.characters.length} personnage(s))${blacklistStatus}`);
      
    } catch (error) {
      console.error('❌ Erreur lors de la réponse:', error);
      await message.reply({
        content: `❌ Une erreur s'est produite lors de la récupération du profil.`
      });
    }
  }
});

client.login(DISCORD_BOT_TOKEN).catch(error => {
  console.error('❌ Erreur de connexion:', error);
  process.exit(1);
});
