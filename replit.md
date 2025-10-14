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
Le bot est conçu pour être déployé sur **Wispbyte + Neon** avec un uptime 24/7 gratuit (100% gratuit, pas de carte bancaire !).

### Solution recommandée : Wispbyte + Neon
- **Wispbyte** : Hébergement du bot Discord gratuit 24/7
- **Neon** : Base de données PostgreSQL gratuite

### Pourquoi Wispbyte + Neon ?
- ✅ **Vraiment gratuit pour toujours** (pas de piège)
- ✅ **Pas de carte bancaire** requise du tout
- ✅ **Actif 24/7 automatiquement** (pas de sleep mode)
- ✅ **Ultra simple à déployer** (15 minutes, interface web)
- ✅ **1GB stockage** pour le bot + **3GB PostgreSQL** gratuit
- ✅ **Note 5/5 étoiles** sur Trustpilot

### Comment déployer
1. Créer compte Neon : https://neon.tech → Copier Connection String
2. Créer compte Wispbyte : https://wispbyte.com → Créer un serveur Node.js
3. Uploader les fichiers via interface web
4. Configurer `DISCORD_BOT_TOKEN` et `DATABASE_URL` dans les variables
5. Démarrer le bot → En ligne 24/7 !

Voir `WISPBYTE_DEPLOY.md` pour le guide détaillé étape par étape.

### Alternatives (nécessitent carte bancaire)
- `FLY_DEPLOY.md` : Déploiement sur Fly.io (Docker, CLI)
- `DEPLOY.md` : Déploiement sur Render
- `ALTERNATIVES_HEBERGEMENT.md` : Autres options (Railway, Oracle Cloud)

## Changements récents
- 2025-10-14: Migration vers Wispbyte + Neon (solution 100% gratuite sans carte bancaire)
  - Guide WISPBYTE_DEPLOY.md complet avec captures d'écran
  - Interface web simple (pas de CLI, pas de Docker)
  - Déploiement en 15 minutes via upload de fichiers
  - Vraiment gratuit 24/7 : Wispbyte (bot) + Neon (PostgreSQL)
  - Abandonne Fly.io et Railway (demandent carte bancaire)
- 2025-10-14: Configuration pour déploiement Fly.io/Render/Railway (alternatives)
  - Ajout de Dockerfile, fly.toml, render.yaml, railway.json
  - Guides multiples : FLY_DEPLOY.md, DEPLOY.md, ALTERNATIVES_HEBERGEMENT.md
  - Note : Ces options nécessitent carte bancaire pour vérification
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
