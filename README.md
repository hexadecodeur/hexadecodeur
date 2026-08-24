# Hexa Décodeur — Site vitrine

Site vitrine one-page de **Anthony Exartier** (*Hexa Décodeur*), développeur full-stack augmenté par l'IA.

Interface cyberpunk / HUD, déployée sur Vercel avec formulaire de contact (Resend).

## Aperçu

- **Accueil** — présentation et assistant d'intro
- **À propos** — parcours et approche
- **Services** — types de produits et fonctionnalités
- **Expertises** — grille « Mon Arsenal »
- **Projets** — carousel de réalisations
- **Contact** — coordonnées + formulaire « Initialiser une mission »

## Stack

| Couche | Technologies |
|--------|--------------|
| Front | React 19, Vite 7, JavaScript |
| UI | CSS custom, [react-icons](https://react-icons.github.io/react-icons/) |
| API | Vercel Function (`api/contact.js`) + [Resend](https://resend.com) |
| Tooling | ESLint, pnpm |

## Prérequis

- [Node.js](https://nodejs.org/) 18+
- [pnpm](https://pnpm.io/)
- Compte [Resend](https://resend.com) (envoi d’emails)
- [Vercel CLI](https://vercel.com/docs/cli) pour tester l’API en local (`vercel dev`)

## Installation

```bash
git clone https://github.com/hellOdevOps-bit/hello-dev0ps.git
cd hexa decodeur
pnpm install
cp .env.example .env.local
```

Renseigne `RESEND_API_KEY` (et optionnellement `CONTACT_FROM` / `CONTACT_TO`) dans `.env.local`.

## Scripts

| Commande | Description |
|----------|-------------|
| `pnpm dev` | Front Vite seul (l’API `/api/contact` n’est **pas** disponible) |
| `vercel dev` | Front + fonctions Vercel (test du formulaire complet) |
| `pnpm build` | Build de production dans `dist/` |
| `pnpm preview` | Prévisualisation du build front |
| `pnpm lint` | Vérification ESLint |

## Formulaire de contact (Resend)

Le front envoie un `POST /api/contact` (JSON) vers la fonction Vercel, qui envoie l’email via Resend.

### Variables d’environnement

À configurer dans **Vercel → Settings → Environment Variables**, et en local dans `.env.local` :

| Variable | Rôle |
|----------|------|
| `RESEND_API_KEY` | Clé API Resend (**jamais** préfixer par `VITE_`) |
| `CONTACT_FROM` | Expéditeur (domaine vérifié chez Resend). Défaut test : `Hexa Décodeur <onboarding@resend.dev>` |
| `CONTACT_TO` | Destinataire. Défaut : `hexadecodeur@gmail.com` |

L’email du visiteur est placé en `replyTo` : quand tu cliques sur « Répondre » dans Gmail, la réponse part au client.

Sans domaine vérifié, utilise l’adresse de test Resend. En production, préfère `contact@ton-domaine.fr` après vérification DNS.

### Sécurité (v1)

- validation des champs obligatoires et des longueurs
- validation du format email
- honeypot anti-bot (`website`)
- clé API uniquement côté serveur
- pas d’upload de fichiers (joindre un document en répondant à l’email)

## Structure du projet

```
api/
└── contact.js      # Vercel Function — envoi Resend
src/
├── components/     # UI (Navbar, Footer, ContactForm, Arsenal…)
├── data/           # Données (projets, arsenal, questions formulaire)
├── pages/          # OnePage
├── utils/          # Helpers (scroll…)
├── assets/
├── App.jsx
├── main.jsx
└── index.css
```

## Personnalisation

- **Technologies** → `src/data/arsenal.js`
- **Projets** → `src/data/projects.js`
- **Questions formulaire** → `src/data/contactForm.js`
- **Couleurs & thème** → `src/index.css`

## Déploiement

Connecte le dépôt GitHub à Vercel. Le build Vite produit `dist/`, et `api/contact.js` est déployé comme serverless function.

```bash
pnpm build
```

## Auteur

**Anthony Exartier** — Hexa Décodeur

- [LinkedIn](https://linkedin.com/in/anthony-exartier)
- [GitHub](https://github.com/hellOdevOps-bit)
- [hexadecodeur@gmail.com](mailto:hexadecodeur@gmail.com)

## Licence

Voir le fichier [LICENSE](LICENSE).
