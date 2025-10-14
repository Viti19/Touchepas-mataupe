# Discord Bot - Profil Ankama Dofus Touch

## Vue d'ensemble
Bot Discord ultra-simple pour générer automatiquement des liens vers les profils Ankama Dofus Touch. Créé pour faciliter la vérification des profils de joueurs pendant le processus de recrutement des guildes.

## Fonctionnalités principales
- Détection automatique des noms de compte Ankama dans les messages
- Scraping automatique des profils Ankama pour récupérer les informations des personnages
- Affichage des personnages avec nom, classe, niveau, serveur et guilde
- **Système de blacklist** pour marquer les comptes suspects (usurpateurs, taupes)
- Base de données PostgreSQL pour stocker la blacklist de manière permanente
- Commandes: !blacklist, !blacklist-list, !blacklist-remove
- Avertissement automatique si un compte recherché est blacklisté
- Génération instantanée de liens sans commande
- Messages en français adaptés pour les guildes Dofus Touch
- Ultra simple: tapez juste le nom du compte (ex: `Midnighto-6615`) et le bot répond automatiquement

## Architecture du projet
```
.
├── bot.js           # Fichier principal du bot Discord avec système de blacklist
├── package.json     # Configuration Node.js et dépendances
├── .gitignore       # Fichiers à ignorer par Git
└── README.md        # Documentation utilisateur
```

## Dépendances
- Node.js 20
- discord.js v14.23.2
- cheerio (web scraping)
- node-fetch (requêtes HTTP)
- pg (PostgreSQL client)

## Configuration requise
- Variable d'environnement `DISCORD_BOT_TOKEN` contenant le token du bot Discord
- Variable d'environnement `DATABASE_URL` pour la connexion PostgreSQL
- Base de données PostgreSQL avec table `blacklist` (créée automatiquement)
- Le bot doit être invité sur le serveur Discord avec les permissions appropriées

## Workflow configuré
- **Discord Bot**: `npm start` - Démarre le bot Discord (console output)

## Déploiement
Le bot est conçu pour être déployé sur **Render** avec un uptime 24/7 gratuit.

### Fichiers de configuration Render
- `render.yaml` : Configuration Blueprint pour déploiement automatique
- `.env.example` : Template des variables d'environnement
- `DEPLOY.md` : Guide complet de déploiement étape par étape

### Comment déployer
1. Push le code sur GitHub
2. Créer un Blueprint sur Render avec le fichier `render.yaml`
3. Configurer le `DISCORD_BOT_TOKEN` dans les variables d'environnement
4. Le bot est automatiquement actif 24/7 (Background Worker)

Voir `DEPLOY.md` pour les instructions détaillées.

## Changements récents
- 2025-10-14: Configuration pour déploiement Render 24/7
  - Ajout de render.yaml pour déploiement Blueprint automatique
  - Configuration Background Worker (uptime 24/7 gratuit)
  - Guide de déploiement complet (DEPLOY.md)
  - Template .env.example pour les variables d'environnement
- 2025-10-14: Ajout du système de blacklist avec base de données PostgreSQL
  - Table blacklist avec compte, raison, auteur, date_ajout
  - Commandes !blacklist, !blacklist-list, !blacklist-remove
  - Avertissement automatique lors de la recherche d'un compte blacklisté
- 2025-10-14: Amélioration de l'affichage des personnages
  - Support de plusieurs personnages avec découpage automatique si message trop long
  - Compteur de personnages trouvés
- 2025-10-14: Création initiale du bot avec détection automatique
  - Scraping des profils Ankama avec cheerio
  - Affichage des personnages (nom, classe, niveau, serveur, guilde)
  - Structure simplifiée utilisant le token Discord Bot classique
  - Messages en français pour les utilisateurs francophones
