# 🤖 Touche pas à ma taupe - Bot Discord

Bot Discord ultra-simple pour vérifier les profils Ankama Dofus Touch pendant le recrutement de guilde. Détection automatique + système de blacklist intégré.

## ✨ Fonctionnalités

- 🔍 **Détection automatique** : Tapez juste `Nom-1234` dans le chat, le bot répond instantanément
- 👥 **Affichage complet** : Tous les personnages avec nom, classe, niveau, serveur et guilde
- 🚫 **Système de blacklist** : Marquez les comptes suspects (usurpateurs, taupes)
- 💾 **Base de données PostgreSQL** : Stockage permanent de la blacklist
- 🇫🇷 **Messages en français** : Interface adaptée aux guildes francophones

## 🚀 Déploiement GRATUIT (sans carte bancaire)

### ⭐ Solution recommandée : Wispbyte + Neon

**100% GRATUIT, 24/7, SANS CARTE BANCAIRE** ✅

1. **Créer la base de données** (2 minutes) :
   - Allez sur https://neon.tech
   - Créez un compte gratuit
   - Créez un projet PostgreSQL
   - Copiez le "Connection String"

2. **Héberger le bot** (13 minutes) :
   - Allez sur https://wispbyte.com
   - Créez un compte gratuit
   - Créez un serveur Node.js
   - Uploadez les fichiers via l'interface web
   - Configurez `DISCORD_BOT_TOKEN` et `DATABASE_URL`
   - Démarrez le bot !

**📖 Guide complet étape par étape** : Consultez [`WISPBYTE_DEPLOY.md`](./WISPBYTE_DEPLOY.md)

### Alternatives (nécessitent carte bancaire)

- **Fly.io** : Voir [`FLY_DEPLOY.md`](./FLY_DEPLOY.md)
- **Render** : Voir [`DEPLOY.md`](./DEPLOY.md)
- **Autres** : Voir [`ALTERNATIVES_HEBERGEMENT.md`](./ALTERNATIVES_HEBERGEMENT.md)

## 🛠️ Configuration Discord Bot

### 1. Créer une application Discord Bot

1. Allez sur le [Portail Discord Developer](https://discord.com/developers/applications)
2. Cliquez sur "New Application" et donnez-lui un nom
3. Allez dans l'onglet "Bot":
   - Cliquez sur "Add Bot"
   - **IMPORTANT** : Activez "Message Content Intent" (obligatoire pour que le bot puisse lire vos messages)
   - Copiez le token du bot (cliquez sur "Reset Token" si nécessaire)
4. Dans l'onglet "OAuth2" > "URL Generator":
   - Cochez "bot"
   - Dans les permissions du bot, cochez: "Send Messages", "Read Messages/View Channels"
   - Copiez l'URL générée et ouvrez-la pour ajouter le bot à votre serveur

### 2. Configurer le Token

Le bot a besoin du `DISCORD_BOT_TOKEN` pour se connecter à Discord. Ajoutez-le dans les variables d'environnement de votre hébergeur (Wispbyte, Fly.io, etc.).

## 🎮 Utilisation

### Rechercher un profil

C'est **ultra simple** ! Tapez juste le nom du compte dans le chat :

```
Midnighto-6615
```

Le bot répond automatiquement avec tous les personnages ! ✨

**Exemple de réponse :**
```
🔍 Profil Ankama Dofus Touch

📋 Compte: Midnighto-6615
🔗 Lien: https://account.ankama.com/fr/profil-ankama/Midnighto-6615/dofustouch

👥 Personnages trouvés : 3

**1. Midniight**
   └ Classe: Iop | Niveau: Lvl 200
   └ Serveur: Tiliwan
   └ Guilde: The Revenant'S

**2. Midnights**
   └ Classe: Féca | Niveau: Lvl 150
   └ Serveur: Brutas
   └ Guilde: Aucune

**3. Midnighto**
   └ Classe: Eniripsa | Niveau: Lvl 120
   └ Serveur: Tiliwan
   └ Guilde: The Revenant'S
```

### Commandes de blacklist

**Ajouter un compte à la blacklist :**
```
!blacklist Nom-1234 Raison du blacklist
```
Exemple : `!blacklist Midnighto-6615 Usurpateur confirmé`

**Voir tous les comptes blacklistés :**
```
!blacklist-list
```

**Retirer un compte de la blacklist :**
```
!blacklist-remove Nom-1234
```

### Fonctionnement de la blacklist

- Quand vous recherchez un compte blacklisté, le bot affiche un **⚠️ AVERTISSEMENT** avec la raison et l'auteur
- Tous les comptes blacklistés sont enregistrés dans PostgreSQL
- Parfait pour le recrutement de guilde et éviter les usurpateurs/taupes !

## 📦 Installation locale (test)

```bash
git clone https://github.com/Viti19/Touchepas-mataupe.git
cd Touchepas-mataupe
npm install
```

Créez un fichier `.env` :
```env
DISCORD_BOT_TOKEN=votre_token_discord
DATABASE_URL=postgresql://user:pass@host/db
```

Lancez le bot :
```bash
npm start
```

## 🗄️ Base de données

La table `blacklist` est créée automatiquement au démarrage :

| Colonne | Type | Description |
|---------|------|-------------|
| id | SERIAL | ID unique auto-incrémenté |
| compte | VARCHAR(255) | Nom du compte (unique) |
| raison | VARCHAR(500) | Raison du blacklist |
| auteur | VARCHAR(255) | Qui a ajouté le blacklist |
| date_ajout | TIMESTAMP | Date et heure d'ajout |

## 📝 Technologies

- **Node.js 20**
- **discord.js** v14.23.2 - Interactions Discord
- **cheerio** - Web scraping des profils Ankama
- **node-fetch** - Requêtes HTTP
- **pg** - Client PostgreSQL

## Format de compte accepté

Le bot détecte automatiquement les noms de compte au format :
- `Nom-Chiffres` (exemple : `Midnighto-6615`)
- Le nom peut contenir des lettres, chiffres et underscores
- Les chiffres après le tiret peuvent avoir de 1 à 5 chiffres

## 🤝 Contribution

Les pull requests sont les bienvenues ! Pour des changements majeurs, ouvrez d'abord une issue.

## 📄 Licence

ISC

## 🆘 Support

- Problème de déploiement ? Consultez [`WISPBYTE_DEPLOY.md`](./WISPBYTE_DEPLOY.md)
- Problème Discord ? Vérifiez que **"Message Content Intent"** est activé dans le Developer Portal
- Questions ? Ouvrez une issue sur GitHub

---

**Fait avec ❤️ pour les guildes Dofus Touch**
