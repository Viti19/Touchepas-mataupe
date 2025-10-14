# Bot Discord - Profil Ankama Dofus Touch

Bot Discord simple pour générer des liens vers les profils Ankama Dofus Touch. Utile pour les guildes qui souhaitent vérifier les profils de leurs membres pendant le recrutement.

## Configuration

### 1. Créer une application Discord Bot

1. Allez sur le [Portail Discord Developer](https://discord.com/developers/applications)
2. Cliquez sur "New Application" et donnez-lui un nom
3. Allez dans l'onglet "Bot" et cliquez sur "Add Bot"
4. Copiez le token du bot (cliquez sur "Reset Token" si nécessaire)
5. Dans l'onglet "OAuth2" > "URL Generator":
   - Cochez "bot" et "applications.commands"
   - Dans les permissions du bot, cochez: "Send Messages", "Use Slash Commands"
   - Copiez l'URL générée et ouvrez-la pour ajouter le bot à votre serveur

### 2. Configurer le Token

Le bot a besoin d'un token Discord Bot pour fonctionner. Vous devez ajouter le secret `DISCORD_BOT_TOKEN` avec le token de votre bot Discord.

## Utilisation

Une fois le bot configuré et démarré:

1. Dans votre serveur Discord, tapez `/profil`
2. Entrez le nom du compte Ankama (exemple: `Midnighto-6615`)
3. Le bot génère automatiquement le lien: `https://account.ankama.com/fr/profil-ankama/Midnighto-6615/dofustouch`

**⏱️ Note importante :** Après le premier démarrage du bot, les commandes slash peuvent prendre jusqu'à 1 heure pour apparaître sur Discord (c'est normal, c'est le délai de propagation de Discord). Si la commande `/profil` n'apparaît pas immédiatement, patientez un peu.

## Commandes disponibles

- `/profil <compte>` - Génère un lien vers le profil Ankama Dofus Touch du compte spécifié

## Exemple

```
/profil Midnighto-6615
```

Résultat:
```
🔍 Profil Ankama Dofus Touch

📋 Compte: Midnighto-6615
🔗 Lien: https://account.ankama.com/fr/profil-ankama/Midnighto-6615/dofustouch
```
