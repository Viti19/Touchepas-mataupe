import { Client, GatewayIntentBits, REST, Routes, SlashCommandBuilder } from 'discord.js';

const DISCORD_BOT_TOKEN = process.env.DISCORD_BOT_TOKEN;

if (!DISCORD_BOT_TOKEN) {
  console.error('❌ DISCORD_BOT_TOKEN manquant! Veuillez configurer le token de votre bot Discord.');
  process.exit(1);
}

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages]
});

const commands = [
  new SlashCommandBuilder()
    .setName('profil')
    .setDescription('Génère un lien vers le profil Ankama Dofus Touch')
    .addStringOption(option =>
      option.setName('compte')
        .setDescription('Nom du compte Ankama (ex: Midnighto-6615)')
        .setRequired(true)
    )
];

async function registerCommands() {
  const rest = new REST({ version: '10' }).setToken(DISCORD_BOT_TOKEN);

  try {
    console.log('📝 Enregistrement des commandes slash...');

    const guilds = client.guilds.cache.map(guild => guild.id);
    
    for (const guildId of guilds) {
      await rest.put(
        Routes.applicationGuildCommands(client.application.id, guildId),
        { body: commands.map(cmd => cmd.toJSON()) }
      );
      console.log(`✅ Commandes enregistrées pour le serveur: ${guildId}`);
    }
  } catch (error) {
    console.error('❌ Erreur lors de l\'enregistrement des commandes:', error);
  }
}

client.once('ready', async () => {
  console.log(`✅ Bot connecté en tant que ${client.user.tag}`);
  await registerCommands();
  console.log('🤖 Bot Discord prêt à utiliser!');
});

client.on('interactionCreate', async interaction => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === 'profil') {
    const compte = interaction.options.getString('compte');
    
    const lien = `https://account.ankama.com/fr/profil-ankama/${compte}/dofustouch`;
    
    await interaction.reply({
      content: `🔍 **Profil Ankama Dofus Touch**\n\n📋 Compte: \`${compte}\`\n🔗 Lien: ${lien}`,
      ephemeral: false
    });
  }
});

client.login(DISCORD_BOT_TOKEN).catch(error => {
  console.error('❌ Erreur de connexion:', error);
  process.exit(1);
});
