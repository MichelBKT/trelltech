# trelltech

# 🧠 Agilix – Application de gestion de projet Kanban

Agilix est une application web permettant de gérer ses tâches de manière visuelle et collaborative, à la manière de Trello. Elle est conçue pour offrir une expérience fluide en exploitant l’API de Trello, avec une interface moderne en violet néon.

---

## 📦 Exigences

- Node.js (v16+ recommandé)  
- npm ou yarn  
- Un compte Trello avec une **clé API** et un **token**  
- Accès à Internet pour l’appel à l’API Trello

---

## ⚙️ Installation

1. **Clone du dépôt :**
   ```bash
   git clone  https://github.com/EpitechMscProPromo2027/T-DEV-600-NCY_1.git
   cd agilix
   ```

2. **Installation des dépendances :**
   ```bash
   npm install
   ```

3. **Configuration de l'environnement :**  
   Crée un fichier `.env` à la racine du projet :
   ```env
   VITE_TRELLO_API_KEY=ta_clé_api
   VITE_TRELLO_API_TOKEN=ton_token
   ```

4. **Lancer le serveur de développement :**
   ```bash
   npm run dev
   ```

---

## 🌐 Déploiement

Tu peux déployer Agilix sur :

- [Vercel](https://vercel.com/)
- [Netlify](https://www.netlify.com/)
- ou tout autre hébergeur prenant en charge Vite/React.

---

## 🛠️ Stack & Frameworks utilisés

| Technologie | Rôle |
|-------------|------|
| **React.js** | Librairie JS pour le front |
| **Vite.js** | Bundler rapide pour React |
| **Trello API** | Backend distant pour la gestion des boards |
| **CSS** / **Tailwind (optionnel)** | Stylisation |
| **ESLint** | Linter de code |

---

## 🖌️ UX/UI

- Design responsive pensé pour desktop
- Palette monochrome **violet néon**
- Inspiration Kanban & Trello
- Prototype disponible sur Figma (`zzz_Figma_Link.txt` dans le repo)

---

## ✅ Fonctionnalités prévues

- Authentification avec l'API Trello
- Affichage dynamique des tableaux et listes
- Glisser-déposer de cartes
- Création/modification/suppression de tâches
- Interface réactive et fluide

---

## 🧪 Tests

Des tests manuels seront réalisés à chaque fin de sprint :
- Accessibilité
- Responsiveness
- UX Flow
- Fonctionnalités critiques (création, glisser-déposer, persistance)
