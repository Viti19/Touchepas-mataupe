# 🆓 Alternatives d'hébergement 100% GRATUITES 24/7

⚠️ **Important** : Render a changé sa politique - les Background Workers nécessitent maintenant un paiement.

Voici les meilleures alternatives pour héberger votre bot Discord **GRATUITEMENT avec uptime 24/7** :

---

## 🥇 Option 1 : Railway (RECOMMANDÉ)

✅ **100% gratuit** - $5 de crédit gratuit par mois (suffisant pour un bot Discord)  
✅ **24/7 sans interruption** - Pas de sleep  
✅ **Base de données PostgreSQL incluse**  
✅ **Déploiement ultra simple**  

### Comment déployer sur Railway :

1. **Créez un compte** : [railway.app](https://railway.app)

2. **Déployez depuis GitHub** :
   ```
   - Cliquez "New Project"
   - Sélectionnez "Deploy from GitHub repo"
   - Choisissez : Viti19/Touchepas-mataupe
   - Railway détecte automatiquement Node.js
   ```

3. **Ajoutez PostgreSQL** :
   ```
   - Dans votre projet, cliquez "+ New"
   - Sélectionnez "Database" → "Add PostgreSQL"
   - Railway crée automatiquement DATABASE_URL
   ```

4. **Configurez les variables** :
   ```
   - Allez dans votre service
   - Onglet "Variables"
   - Ajoutez : DISCORD_BOT_TOKEN = votre_token
   - DATABASE_URL est déjà configuré automatiquement
   ```

5. **Déployez** :
   - Railway déploie automatiquement
   - Votre bot est actif 24/7 !

### 💰 Coûts Railway :
- **$5 gratuit/mois** (renouvelé chaque mois)
- Un bot Discord consomme environ **$3-4/mois**
- Donc c'est **GRATUIT** indéfiniment !

---

## 🥈 Option 2 : Fly.io

✅ **Gratuit pour petits projets**  
✅ **3 VMs gratuites** (256MB RAM chacune)  
✅ **Toujours actif**  
✅ **PostgreSQL gratuit** (3GB)  

### Déploiement Fly.io :

1. **Installez Fly CLI** :
   ```bash
   curl -L https://fly.io/install.sh | sh
   ```

2. **Créez une app** :
   ```bash
   fly auth login
   fly launch
   # Suivez les instructions
   ```

3. **Ajoutez PostgreSQL** :
   ```bash
   fly postgres create
   fly postgres attach <db-name>
   ```

4. **Configurez les secrets** :
   ```bash
   fly secrets set DISCORD_BOT_TOKEN=votre_token
   ```

5. **Déployez** :
   ```bash
   fly deploy
   ```

---

## 🥉 Option 3 : Oracle Cloud (VRAIMENT GRATUIT À VIE)

✅ **Gratuit pour TOUJOURS** (vraiment !)  
✅ **24GB RAM + 4 vCPU gratuits**  
✅ **Aucune carte bancaire requise après inscription**  
✅ **Le plus généreux du marché**  

### Déploiement Oracle Cloud :

1. **Créez un compte** : [oracle.com/cloud/free](https://www.oracle.com/cloud/free/)

2. **Créez une VM** :
   - Compute → Instances → Create Instance
   - Image : Ubuntu 22.04
   - Shape : VM.Standard.A1.Flex (ARM, gratuit)
   - 2 OCPUs + 12GB RAM (gratuit à vie !)

3. **Installez Node.js** :
   ```bash
   ssh ubuntu@<votre-ip>
   curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
   sudo apt-get install -y nodejs postgresql
   ```

4. **Clonez et déployez** :
   ```bash
   git clone https://github.com/Viti19/Touchepas-mataupe.git
   cd Touchepas-mataupe
   npm install
   
   # Configurez .env
   nano .env
   # Ajoutez : DISCORD_BOT_TOKEN=votre_token
   
   # Lancez avec PM2 (redémarrage auto)
   sudo npm install -g pm2
   pm2 start bot.js
   pm2 startup
   pm2 save
   ```

---

## 🔧 Option 4 : Render (avec Web Service)

⚠️ **Limitation** : Le bot **s'éteint après 15 minutes d'inactivité**  
✅ **Gratuit** mais pas idéal pour Discord  

Le `render.yaml` a été modifié pour utiliser un Web Service (gratuit), mais :
- Le bot dort après 15 min sans requête HTTP
- Pas recommandé pour un bot Discord actif 24/7

---

## 📊 Comparatif

| Service | Gratuit | 24/7 | Facile | PostgreSQL | Notes |
|---------|---------|------|--------|------------|-------|
| **Railway** | ✅ $5/mois | ✅ | ⭐⭐⭐⭐⭐ | ✅ | **RECOMMANDÉ** |
| **Fly.io** | ✅ | ✅ | ⭐⭐⭐⭐ | ✅ | Très bon |
| **Oracle Cloud** | ✅ À vie | ✅ | ⭐⭐⭐ | ⚙️ Manuel | Le + puissant |
| **Render (Web)** | ✅ | ❌ Sleep | ⭐⭐⭐⭐⭐ | ✅ | Dort après 15min |
| **Render (Worker)** | ❌ Payant | ✅ | ⭐⭐⭐⭐⭐ | ✅ | $7/mois minimum |

---

## 🎯 Recommandation finale

### Pour un déploiement FACILE et GRATUIT 24/7 :

**Utilisez Railway** 🚂

1. Allez sur [railway.app](https://railway.app)
2. "New Project" → "Deploy from GitHub repo"
3. Connectez `Viti19/Touchepas-mataupe`
4. Ajoutez PostgreSQL
5. Configurez `DISCORD_BOT_TOKEN`
6. C'est tout ! 🎉

Votre bot sera actif 24/7 gratuitement avec les $5/mois offerts !

---

## 🔄 Migration depuis Render

Si vous avez déjà créé le projet sur Render :

1. **Exportez votre blacklist** (si vous avez des données) :
   ```sql
   -- Dans le Shell PostgreSQL de Render
   SELECT * FROM blacklist;
   -- Copiez les résultats
   ```

2. **Déployez sur Railway** (voir instructions ci-dessus)

3. **Importez votre blacklist** :
   ```sql
   -- Dans la console PostgreSQL de Railway
   INSERT INTO blacklist (compte, raison, auteur, date_ajout) VALUES
   ('Compte-1234', 'Raison', 'Auteur', NOW());
   ```

---

## 💡 Conseil

**Railway est le meilleur choix** pour :
- ✅ Facilité de déploiement
- ✅ Vraiment gratuit 24/7
- ✅ PostgreSQL inclus
- ✅ Support GitHub auto-deploy
- ✅ Interface simple

**Passez à Railway et oubliez les limitations de Render !** 🚀
