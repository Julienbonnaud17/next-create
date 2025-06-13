# next-create

> Un CLI simple et rapide pour générer des pages et des composants dans un projet Next.js (App Router, TypeScript, Tailwind, etc.)

---

## ✨ Fonctionnalités

- ✅ Génère une **page Next.js** (`app/[name]/page.tsx`)
- ✅ Génère un **layout** en option (`layout.tsx`)
- ✅ Génère un composant React (`src/components/[Name].tsx`)
- ✅ Supporte les **routes dynamiques** (`[slug]`)
- ✅ Option `--client` pour ajouter `"use client"`
- ✅ Utilisable dans tous tes projets

---

## 📦 Installation

```bash
npm install -g next-create
```

> Nécessite Node.js ≥ 16

---

## 🚀 Utilisation

### ➕ Générer une page

```bash
next-create page home
```

### ➕ Générer une page avec layout

```bash
next-create page blog --with-layout
```

### ➕ Générer une page dynamique

```bash
next-create page [slug]
```

### ➕ Générer une page client-side

```bash
next-create page dashboard --client
```

---

### 🎨 Générer un composant

```bash
next-create component Button
```

### 🎨 Générer un composant client-side

```bash
next-create component Modal --client
```

---

## 🗂️ Structure générée

**Page simple** :
```
app/home/page.tsx
```

**Page avec layout** :
```
app/blog/layout.tsx
app/blog/page.tsx
```

**Composant** :
```
src/components/Button.tsx
```

---

## ⚙️ Options disponibles

| Commande                | Description                               |
|-------------------------|-------------------------------------------|
| `page [name]`           | Crée une page Next.js                     |
| `component [name]`      | Crée un composant React                   |
| `--with-layout`         | Ajoute un `layout.tsx`                    |
| `--client`              | Ajoute `"use client"` dans le fichier     |

---

## 🧪 Développement local

```bash
# Cloner le repo
git clone https://github.com/ton-pseudo/next-create.git
cd next-create

# Installer les dépendances
npm install

# Compiler le TypeScript
npm run build

# Lier le CLI pour tests locaux
npm link

# Utilisation
next-create page test
```

---

## 📝 Licence

MIT — © Getsu
