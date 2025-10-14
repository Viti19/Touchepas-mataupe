# Discord Bot - Profil Ankama Dofus Touch

## Vue d'ensemble
Bot Discord simple pour générer automatiquement des liens vers les profils Ankama Dofus Touch. Créé pour faciliter la vérification des profils de joueurs pendant le processus de recrutement des guildes.

## Fonctionnalités principales
- Commande slash `/profil` pour générer des liens Ankama
- Messages en français adaptés pour les guildes Dofus Touch
- Simple à utiliser: tapez le nom du compte et recevez le lien complet

## Architecture du projet
```
.
├── bot.js           # Fichier principal du bot Discord
├── package.json     # Configuration Node.js et dépendances
├── .gitignore       # Fichiers à ignorer par Git
└── README.md        # Documentation utilisateur
```

## Dépendances
- Node.js 20
- discord.js v14.23.2

## Configuration requise
- Variable d'environnement `DISCORD_BOT_TOKEN` contenant le token du bot Discord
- Le bot doit être invité sur le serveur Discord avec les permissions appropriées

## Workflow configuré
- **Discord Bot**: `npm start` - Démarre le bot Discord (console output)

## Changements récents
- 2025-10-14: Création initiale du bot avec commande `/profil`
- Structure simplifiée utilisant le token Discord Bot classique
- Messages en français pour les utilisateurs francophones
