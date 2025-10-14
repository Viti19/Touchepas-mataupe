# 🚀 Push vers GitHub - Touche pas à ma taupe

## Commandes à exécuter dans le Shell

Copiez et collez ces commandes une par une dans le Shell Replit :

```bash
# 1. Configurer le remote GitHub
git remote add origin https://github.com/Viti19/Touchepas-mataupe.git

# 2. Vérifier le remote
git remote -v

# 3. Ajouter tous les fichiers
git add .

# 4. Créer le commit
git commit -m "Initial commit - Bot Discord Ankama avec système de blacklist"

# 5. Renommer la branche en main (si nécessaire)
git branch -M main

# 6. Pusher vers GitHub
git push -u origin main
```

## ⚠️ Si GitHub demande une authentification

Si GitHub demande un mot de passe, utilisez un **Personal Access Token** :

### Créer un token GitHub :

1. Allez sur GitHub → **Settings** (icône profil)
2. Cliquez sur **Developer settings** (en bas à gauche)
3. Cliquez sur **Personal access tokens** → **Tokens (classic)**
4. Cliquez sur **Generate new token** → **Generate new token (classic)**
5. Donnez un nom : `Replit-Bot-Discord`
6. Cochez : **repo** (accès complet au repo)
7. Cliquez sur **Generate token**
8. **COPIEZ LE TOKEN** (vous ne le reverrez plus !)

### Utiliser le token :

Quand Git demande le mot de passe, collez le **token** au lieu du mot de passe.

Ou configurez-le directement :

```bash
git remote set-url origin https://Viti19:VOTRE_TOKEN@github.com/Viti19/Touchepas-mataupe.git
git push -u origin main
```

## ✅ Vérification

Une fois pushé, allez sur : https://github.com/Viti19/Touchepas-mataupe

Vous devriez voir tous les fichiers :
- ✅ bot.js
- ✅ package.json
- ✅ render.yaml
- ✅ README.md
- ✅ DEPLOY.md
- ✅ .env.example

## 🚀 Déployer sur Render

Une fois sur GitHub, suivez le guide **DEPLOY.md** pour déployer sur Render :

1. Allez sur [render.com](https://render.com)
2. New + → Blueprint
3. Connectez le repo : `Viti19/Touchepas-mataupe`
4. Cliquez "Apply"
5. Ajoutez votre `DISCORD_BOT_TOKEN`
6. Le bot sera actif 24/7 ! 🎉

---

**Note** : Si vous avez des problèmes avec git, vous pouvez aussi :
1. Télécharger tous les fichiers localement (Download as ZIP)
2. Créer un nouveau repo sur GitHub
3. Uploader les fichiers manuellement via l'interface GitHub
