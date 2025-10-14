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
