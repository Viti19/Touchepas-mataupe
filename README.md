# Bot Discord - Profil Ankama Dofus Touch

Bot Discord ultra-simple pour générer des liens vers les profils Ankama Dofus Touch. Utile pour les guildes qui souhaitent vérifier les profils de leurs membres pendant le recrutement.

## Configuration

### 1. Créer une application Discord Bot

1. Allez sur le [Portail Discord Developer](https://discord.com/developers/applications)
2. Cliquez sur "New Application" et donnez-lui un nom
3. Allez dans l'onglet "Bot":
   - Cliquez sur "Add Bot"
   - **IMPORTANT** : Activez "Message Content Intent" (obligatoire pour que le bot puisse lire vos messages)
   - Copiez le token du bot (cliquez sur "Reset Token" si nécessaire)
4. Dans l'onglet "OAuth2" > "URL Generator":
   - Cochez "bot"
   - Dans les permissions du bot, cochez: "Send Messages", "Read Messages"
   - Copiez l'URL générée et ouvrez-la pour ajouter le bot à votre serveur

### 2. Configurer le Token

Le bot a besoin d'un token Discord Bot pour fonctionner. Vous devez ajouter le secret `DISCORD_BOT_TOKEN` avec le token de votre bot Discord.

## Utilisation

C'est **ultra simple** ! Une fois le bot configuré et démarré:

1. Dans votre serveur Discord, tapez simplement le nom du compte Ankama (format: `Nom-1234`)
2. Le bot détecte automatiquement le format et récupère les informations du profil

**Pas de commande, pas de slash - juste le nom du compte !**

## Fonctionnalités

✅ **Affichage automatique des personnages** avec :
- Nom du personnage
- Classe
- Niveau
- Serveur
- Guilde (si le personnage en a une)

✅ **Lien direct** vers le profil Ankama Dofus Touch

## Exemple

Vous tapez dans le chat:
```
Midnighto-6615
```

Le bot répond automatiquement:
```
🔍 Profil Ankama Dofus Touch

📋 Compte: Midnighto-6615
🔗 Lien: https://account.ankama.com/fr/profil-ankama/Midnighto-6615/dofustouch

👥 Personnages:

**1. Midniight**
   └ Classe: Iop | Niveau: Lvl 200
   └ Serveur: Tiliwan
   └ Guilde: The Revenant'S
```

## Format accepté

Le bot détecte automatiquement les noms de compte au format:
- `Nom-Chiffres` (exemple: `Midnighto-6615`)
- Le nom peut contenir des lettres, chiffres et underscores
- Les chiffres après le tiret peuvent avoir de 1 à 5 chiffres

## Système de blacklist

Le bot inclut un système de blacklist pour marquer les comptes suspects (usurpateurs, taupes, etc.).

### Commandes disponibles

**Ajouter un compte à la blacklist:**
```
!blacklist Nom-1234 Raison de la blacklist
```
Exemple: `!blacklist Midnighto-6615 Usurpateur confirmé`

**Voir tous les comptes blacklistés:**
```
!blacklist-list
```

**Retirer un compte de la blacklist:**
```
!blacklist-remove Nom-1234
```

### Fonctionnement

- Quand vous recherchez un compte blacklisté, le bot affiche un **avertissement en gros** avec la raison et l'auteur de la blacklist
- Tous les comptes blacklistés sont enregistrés dans une base de données PostgreSQL
- La blacklist inclut: le nom du compte, la raison, l'auteur et la date d'ajout
- Parfait pour le recrutement de guilde et éviter les problèmes!

## Déploiement sur Render (24/7 GRATUIT)

Le bot est configuré pour être déployé sur Render avec un **uptime 24/7 gratuit** grâce à la configuration "Background Worker".

### Étapes de déploiement :

#### 1. Préparer le code
```bash
# Clonez votre repo ou créez-le sur GitHub
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/votre-username/votre-repo.git
git push -u origin main
```

#### 2. Créer un compte Render
- Allez sur [render.com](https://render.com) et créez un compte gratuit
- Connectez votre compte GitHub

#### 3. Déployer le bot

**Option A : Déploiement automatique avec render.yaml (RECOMMANDÉ)**

1. Dans Render, cliquez sur **"New +"** → **"Blueprint"**
2. Connectez votre repository GitHub
3. Render détectera automatiquement le fichier `render.yaml`
4. Cliquez sur **"Apply"**
5. Render créera automatiquement :
   - Un **Background Worker** (bot Discord, toujours actif)
   - Une **base de données PostgreSQL** gratuite

**Option B : Déploiement manuel**

1. **Créer la base de données :**
   - Cliquez sur **"New +"** → **"PostgreSQL"**
   - Nom : `discord-bot-db`
   - Plan : **Free**
   - Cliquez sur **"Create Database"**
   - Copiez l'**Internal Database URL**

2. **Créer le Background Worker :**
   - Cliquez sur **"New +"** → **"Background Worker"**
   - Connectez votre repository GitHub
   - Configuration :
     - **Name** : `discord-bot-ankama`
     - **Environment** : `Node`
     - **Build Command** : `npm install`
     - **Start Command** : `npm start`
     - **Plan** : `Free`

3. **Ajouter les variables d'environnement :**
   - Dans l'onglet **"Environment"** du worker
   - Ajoutez :
     - `DISCORD_BOT_TOKEN` = votre token Discord
     - `DATABASE_URL` = l'Internal Database URL de votre base de données

4. **Déployer :**
   - Cliquez sur **"Create Background Worker"**
   - Le bot se déploiera automatiquement !

### ✅ Avantages du Background Worker sur Render

- **Uptime 24/7 gratuit** : Le bot ne s'éteint JAMAIS (contrairement aux Web Services)
- **Pas de ping externe nécessaire** : Aucune configuration supplémentaire
- **750 heures/mois gratuites** : Suffisant pour un bot actif 24/7 (720h/mois)
- **Base de données PostgreSQL incluse** : 1 GB de stockage gratuit
- **Auto-redémarrage** : Si le bot crash, Render le redémarre automatiquement
- **Logs en temps réel** : Visualisez les logs directement dans Render

### 📊 Vérifier que le bot fonctionne

1. Dans Render, allez dans votre Background Worker
2. Cliquez sur l'onglet **"Logs"**
3. Vous devriez voir :
   ```
   ✅ Base de données initialisée
   ✅ Bot connecté en tant que Votre Bot#1234
   🤖 Bot Discord prêt!
   ```

### 🔄 Mises à jour automatiques

Chaque fois que vous poussez du code sur votre branche `main`, Render redéploie automatiquement le bot !

```bash
git add .
git commit -m "Nouvelle fonctionnalité"
git push
# Render détecte le push et redéploie automatiquement
```

### 💰 Coûts

- **Plan gratuit** : 
  - 750 heures de compute/mois (suffisant pour 24/7)
  - 1 GB de stockage PostgreSQL
  - Parfait pour un bot de guilde

- **Plan payant** (si vous voulez plus) :
  - À partir de $7/mois pour plus de ressources
  - Mais le plan gratuit suffit largement pour ce bot !
