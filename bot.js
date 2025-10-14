import { Client, GatewayIntentBits } from 'discord.js';

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

client.once('ready', () => {
  console.log(`✅ Bot connecté en tant que ${client.user.tag}`);
  console.log('🤖 Bot Discord prêt! Tapez un nom de compte Ankama (ex: Midnighto-6615) pour générer le lien.');
});

client.on('messageCreate', async (message) => {
  if (message.author.bot) return;
  
  const ankamaPattern = /^([a-zA-Z0-9_]+)-(\d{1,5})$/;
  const match = message.content.trim().match(ankamaPattern);
  
  if (match) {
    const compte = match[0];
    const lien = `https://account.ankama.com/fr/profil-ankama/${compte}/dofustouch`;
    
    try {
      await message.reply({
        content: `🔍 **Profil Ankama Dofus Touch**\n\n📋 Compte: \`${compte}\`\n🔗 Lien: ${lien}`
      });
      console.log(`✅ Lien généré pour: ${compte}`);
    } catch (error) {
      console.error('❌ Erreur lors de la réponse:', error);
    }
  }
});

client.login(DISCORD_BOT_TOKEN).catch(error => {
  console.error('❌ Erreur de connexion:', error);
  process.exit(1);
});
