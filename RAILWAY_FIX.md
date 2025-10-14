# 🔧 FIX Railway - Token manquant

## ✅ Solution GARANTIE en 3 étapes :

### Étape 1 : Vérifiez le SERVICE (pas le projet)

**C'est le problème le plus courant !** 

Dans Railway, vous avez peut-être ajouté la variable au **projet** au lieu du **service**.

1. Allez dans votre projet Railway
2. Cliquez sur le **service** `discord-bot-ankama` (la carte avec le logo GitHub)
3. Onglet **"Variables"** en haut
4. Vérifiez que `DISCORD_BOT_TOKEN` existe ICI (dans le service)

Si elle n'est PAS là :
- Cliquez **"New Variable"**
- **Variable Reference** : Tapez `DISCORD_BOT_TOKEN`
- **Value** : Collez votre token
- **Add**

### Étape 2 : Push le nouveau fichier railway.json

Le fichier `railway.json` que j'ai créé force Railway à bien configurer le déploiement.

```bash
# Dans le Shell ou Terminal
git add railway.json RAILWAY_FIX.md
git commit -m "Fix: Add railway.json config"
git push origin main
```

Railway redéploiera automatiquement avec la bonne config.

### Étape 3 : Redéploiement manuel (si nécessaire)

Si après le push ça ne fonctionne toujours pas :

1. Dans Railway → Votre service
2. Onglet **"Deployments"**
3. Sur le dernier déploiement, cliquez les **3 points** (...)
4. **"Redeploy"**

## 🔍 Vérification finale :

Après redéploiement, dans **"Deployments" → "View Logs"**, vous devriez voir :

```
✅ Base de données initialisée
✅ Bot connecté en tant que Touche pas à ma taupe#9700
🤖 Bot Discord prêt!
```

## 🆘 Si ça ne marche TOUJOURS pas :

**Créez un nouveau service** :

1. Dans Railway, votre projet → **"+ New"**
2. **"GitHub Repo"**
3. Sélectionnez `Viti19/Touchepas-mataupe`
4. Railway crée un nouveau service
5. **Variables** → Ajoutez `DISCORD_BOT_TOKEN`
6. Supprimez l'ancien service qui ne fonctionne pas

---

## ⚡ Solution alternative : Variable de type "Reference"

Si vous avez créé une variable partagée au niveau projet :

1. Dans le **service** → **Variables**
2. Cliquez **"New Variable"**
3. Au lieu de mettre la valeur directement, cliquez sur **"Add Reference"**
4. Sélectionnez la variable partagée `DISCORD_BOT_TOKEN`
5. **Add**

Ça lie la variable du projet au service.

---

**Suivez ces étapes dans l'ordre et ça fonctionnera ! 🚀**
