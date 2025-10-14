import { Client, GatewayIntentBits } from 'discord.js';
import * as cheerio from 'cheerio';
import fetch from 'node-fetch';

const DISCORD_BOT_TOKEN = process.env.DISCORD_BOT_TOKEN;

if (!DISCORD_BOT_TOKEN) {
  console.error('❌ DISCORD_BOT_TOKEN manquant! Veuillez configurer le token de votre bot Discord.');
  process.exit(1);
}

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

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
  
  const ankamaPattern = /^([a-zA-Z0-9_]+)-(\d{1,5})$/;
  const match = message.content.trim().match(ankamaPattern);
  
  if (match) {
    const compte = match[0];
    
    try {
      await message.channel.sendTyping();
      
      const profileData = await getAnkamaProfile(compte);
      
      if (!profileData.success) {
        await message.reply({
          content: `❌ Impossible de récupérer le profil de \`${compte}\`.\nVérifiez que le nom du compte est correct.`
        });
        return;
      }
      
      if (profileData.characters.length === 0) {
        await message.reply({
          content: `🔍 **Profil Ankama Dofus Touch**\n\n📋 Compte: \`${compte}\`\n🔗 Lien: ${profileData.url}\n\n⚠️ Aucun personnage trouvé sur ce compte.`
        });
        return;
      }
      
      const header = `🔍 **Profil Ankama Dofus Touch**\n\n📋 Compte: \`${compte}\`\n🔗 Lien: ${profileData.url}\n\n👥 **Personnages:** (${profileData.characters.length} trouvé(s))\n\n`;
      
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
      
      console.log(`✅ Profil récupéré pour: ${compte} (${profileData.characters.length} personnage(s))`);
      
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
