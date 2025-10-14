# Guide de déploiement Render - Bot Discord Ankama

Ce guide vous explique comment déployer le bot Discord sur Render avec un **uptime 24/7 gratuit**.

## 🚀 Déploiement rapide (5 minutes)

### Prérequis
- Un compte GitHub
- Un compte Render (gratuit) : [render.com](https://render.com)
- Votre token Discord Bot

### Étape 1 : Push sur GitHub

```bash
# Initialisez git si ce n'est pas déjà fait
git init

# Ajoutez tous les fichiers
git add .

# Créez votre premier commit
git commit -m "Initial commit - Bot Discord Ankama"

# Créez la branche main
git branch -M main

# Ajoutez votre remote GitHub
git remote add origin https://github.com/votre-username/discord-bot-ankama.git

# Push vers GitHub
git push -u origin main
```

### Étape 2 : Connectez Render à GitHub

1. Allez sur [render.com](https://render.com)
2. Créez un compte (ou connectez-vous)
3. Cliquez sur votre profil → **Settings** → **Connect GitHub**
4. Autorisez Render à accéder à vos repos

### Étape 3 : Déploiement automatique avec Blueprint

1. Dans Render, cliquez sur **"New +"** en haut à droite
2. Sélectionnez **"Blueprint"**
3. Connectez votre repository `discord-bot-ankama`
4. Render détectera automatiquement le fichier `render.yaml`
5. Cliquez sur **"Apply"**

Render va créer automatiquement :
- ✅ Un **Background Worker** (le bot Discord)
- ✅ Une **base de données PostgreSQL** gratuite
- ✅ La connexion entre les deux

### Étape 4 : Configurez le token Discord

1. Une fois le déploiement terminé, allez dans votre **Background Worker**
2. Cliquez sur l'onglet **"Environment"**
3. Trouvez la variable `DISCORD_BOT_TOKEN`
4. Cliquez sur **"Edit"** et collez votre token Discord
5. Cliquez sur **"Save Changes"**

Le bot va redémarrer automatiquement avec le nouveau token !

### Étape 5 : Vérifiez que ça fonctionne

1. Dans votre Background Worker, allez dans l'onglet **"Logs"**
2. Vous devriez voir :
   ```
   ✅ Base de données initialisée
   ✅ Bot connecté en tant que Votre Bot#1234
   🤖 Bot Discord prêt!
   ```

3. Testez dans Discord :
   - Tapez un nom de compte : `Midnighto-6615`
   - Le bot devrait répondre avec les infos du profil

## ✅ C'est tout ! Votre bot est actif 24/7 !

---

## 📋 Déploiement manuel (alternative)

Si vous préférez créer les services manuellement :

### 1. Créer la base de données

1. Cliquez sur **"New +"** → **"PostgreSQL"**
2. Configuration :
   - **Name** : `discord-bot-db`
   - **Database** : `discord_bot`
   - **User** : `discord_bot_user`
   - **Region** : Choisissez la plus proche de vous
   - **Plan** : **Free**
3. Cliquez sur **"Create Database"**
4. Attendez que la base soit prête (~1 minute)
5. Copiez l'**Internal Database URL** (dans l'onglet "Info")

### 2. Créer le Background Worker

1. Cliquez sur **"New +"** → **"Background Worker"**
2. Connectez votre repository GitHub
3. Configuration :
   - **Name** : `discord-bot-ankama`
   - **Region** : Même région que la base de données
   - **Branch** : `main`
   - **Environment** : `Node`
   - **Build Command** : `npm install`
   - **Start Command** : `npm start`
   - **Plan** : **Free**

4. Variables d'environnement :
   - `DISCORD_BOT_TOKEN` : Votre token Discord
   - `DATABASE_URL` : L'Internal Database URL de votre base

5. Cliquez sur **"Create Background Worker"**

---

## 🔧 Configuration avancée

### Auto-redéploiement

Render redéploie automatiquement votre bot à chaque push sur `main` :

```bash
git add .
git commit -m "Ajout d'une nouvelle fonctionnalité"
git push
# ✅ Render détecte le push et redéploie automatiquement
```

### Voir les logs en temps réel

1. Allez dans votre Background Worker
2. Onglet **"Logs"**
3. Les logs s'affichent en temps réel

### Redémarrer manuellement le bot

1. Allez dans votre Background Worker
2. Cliquez sur **"Manual Deploy"** → **"Deploy latest commit"**

### Gérer la base de données

1. Allez dans votre base de données PostgreSQL
2. Onglet **"Shell"** pour exécuter des requêtes SQL
3. Par exemple, voir tous les comptes blacklistés :
   ```sql
   SELECT * FROM blacklist;
   ```

---

## 💡 Conseils et astuces

### Limites du plan gratuit

- **750 heures/mois** de compute (suffisant pour 24/7, soit 720h)
- **1 GB** de stockage PostgreSQL
- Le bot ne s'éteint **jamais** (contrairement aux Web Services)
- Pas de carte bancaire requise

### Surveillance

- Activez les notifications dans Render (Settings → Notifications)
- Vous serez alerté si le bot crash ou si le déploiement échoue

### Backup de la base de données

Pour sauvegarder votre blacklist :

1. Dans votre base PostgreSQL, onglet **"Shell"**
2. Exportez les données :
   ```sql
   COPY blacklist TO STDOUT WITH CSV HEADER;
   ```

### Passer au plan payant (optionnel)

Si vous voulez plus de performances :
- **Plan Starter** : $7/mois
  - Plus de RAM et CPU
  - Meilleurs temps de démarrage

Mais le plan gratuit suffit pour la plupart des bots de guilde !

---

## 🆘 Dépannage

### Le bot ne se connecte pas

1. Vérifiez que `DISCORD_BOT_TOKEN` est correctement configuré
2. Dans Discord Developer Portal, vérifiez que **Message Content Intent** est activé
3. Regardez les logs pour voir l'erreur exacte

### Erreur de base de données

1. Vérifiez que `DATABASE_URL` pointe vers votre base Render
2. Dans les logs, cherchez "Base de données initialisée"
3. La table `blacklist` est créée automatiquement au démarrage

### Le bot répond lentement

- Sur le plan gratuit, c'est normal
- Le Background Worker peut avoir des délais de quelques secondes
- Pour améliorer : passez au plan Starter ($7/mois)

### Le bot s'est arrêté

- Vérifiez les logs pour voir l'erreur
- Render redémarre automatiquement le bot si crash
- Si problème persiste : "Manual Deploy" → "Clear build cache & deploy"

---

## 📊 Monitoring

Pour suivre l'état de votre bot :

1. **Dashboard Render** : Voyez l'état du worker et de la DB
2. **Logs** : Consultez les logs en temps réel
3. **Metrics** : Voyez l'utilisation CPU/RAM (plan payant)

---

## 🔄 Mises à jour

Pour mettre à jour le bot :

```bash
# Modifiez le code
git add .
git commit -m "Mise à jour: nouvelle fonctionnalité"
git push

# Render redéploie automatiquement
```

Ou manuellement dans Render :
- **Manual Deploy** → **Deploy latest commit**

---

## ✅ Checklist finale

- [ ] Code pushé sur GitHub
- [ ] Blueprint déployé sur Render
- [ ] Token Discord configuré
- [ ] Base de données connectée
- [ ] Bot connecté (visible dans les logs)
- [ ] Test réussi dans Discord
- [ ] Notifications activées (optionnel)

**Votre bot Discord est maintenant actif 24/7 gratuitement !** 🎉
