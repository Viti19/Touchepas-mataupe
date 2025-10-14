# 🚀 Déploiement Fly.io - ULTRA SIMPLE

## ✅ Avantages Fly.io :
- ✅ **Gratuit pour toujours** (3 VMs gratuites)
- ✅ **Pas de carte bancaire** requise
- ✅ **24/7 automatique** (pas de sleep mode)
- ✅ **Déploiement en 5 minutes**
- ✅ **PostgreSQL gratuit** via Neon

---

## 🎯 Déploiement en 3 étapes :

### Étape 1 : Installer Fly CLI

**Sur Windows :**
```powershell
powershell -Command "iwr https://fly.io/install.ps1 -useb | iex"
```

**Sur Mac/Linux :**
```bash
curl -L https://fly.io/install.sh | sh
```

### Étape 2 : Connexion et Configuration

```bash
# Se connecter (créez un compte si besoin, PAS de carte bancaire)
fly auth signup

# OU si vous avez déjà un compte
fly auth login

# Créer la base de données PostgreSQL gratuite sur Neon
# Allez sur https://neon.tech et créez un compte gratuit
# Créez une base de données et copiez le "Connection String"
```

### Étape 3 : Déployer le Bot

```bash
# 1. Initialiser Fly.io (DEPUIS votre dossier local du bot)
fly launch --no-deploy

# Répondez aux questions :
# - App Name: touchepas-mataupe (ou laissez-le générer)
# - Region: cdg (Paris) ou fra (Frankfurt)
# - PostgreSQL: Non (on utilise Neon)
# - Redis: Non

# 2. Configurer le token Discord
fly secrets set DISCORD_BOT_TOKEN=VOTRE_TOKEN_ICI

# 3. Configurer la base de données (URL de Neon)
fly secrets set DATABASE_URL=postgresql://votre_connection_string_neon

# 4. Déployer !
fly deploy
```

**C'est tout ! Votre bot est en ligne 24/7 ! 🎉**

---

## 📊 Vérifier que tout fonctionne :

```bash
# Voir les logs en temps réel
fly logs

# Vous devriez voir :
# ✅ Base de données initialisée
# ✅ Bot connecté en tant que Touche pas à ma taupe#9700
# 🤖 Bot Discord prêt!
```

---

## 🗄️ Configuration PostgreSQL avec Neon (Gratuit)

### 1. Créer la base de données :

1. Allez sur **https://neon.tech**
2. Créez un compte gratuit (email + mot de passe)
3. Créez un nouveau projet
4. Copiez le **Connection String** qui ressemble à :
   ```
   postgresql://username:password@ep-xxx.region.aws.neon.tech/dbname
   ```

### 2. L'ajouter à Fly.io :

```bash
fly secrets set DATABASE_URL="postgresql://username:password@ep-xxx.region.aws.neon.tech/dbname"
```

---

## 🔧 Commandes utiles :

```bash
# Voir les logs
fly logs

# Redémarrer le bot
fly apps restart touchepas-mataupe

# Voir l'état
fly status

# Ouvrir le dashboard
fly dashboard
```

---

## 💡 Plan Gratuit Fly.io :

- **3 VMs partagées** gratuites
- **256MB RAM** par VM
- **3GB stockage** persistant
- **160GB transfert** /mois

**Parfait pour votre bot Discord !** ✅

---

## 🆘 En cas de problème :

### Le bot ne démarre pas ?

Vérifiez les logs :
```bash
fly logs
```

### Token non détecté ?

Vérifiez les secrets :
```bash
fly secrets list
```

### Redéployer :

```bash
fly deploy --force
```

---

## 📌 Important :

- **DISCORD_BOT_TOKEN** : Votre token Discord Bot
- **DATABASE_URL** : Connection string de Neon PostgreSQL
- **Région** : Choisissez `cdg` (Paris) pour la France

---

**Suivez ces étapes et votre bot sera en ligne en 5 minutes ! 🚀**
