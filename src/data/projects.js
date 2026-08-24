import accueil from "../assets/images/wedqr/accueil.jpg"
import galerie from "../assets/images/wedqr/galerie.jpg"
import planTable from "../assets/images/wedqr/plan-table.jpg"
import livreDor from "../assets/images/wedqr/livre-dor.jpg"

export const PROJECTS = [
  {
    id: "wedqr",
    title: "WedQR — Application web pour mariage interactif",
    stack:
      "Next.js 16, React, TypeScript, Tailwind CSS, Supabase (PostgreSQL, Storage, RLS), Vercel, Git/GitHub.",
    sections: [
      {
        heading: "Le besoin",
        text: "Concevoir une application web accessible via un QR Code permettant aux invités d'un mariage de consulter les menus, trouver leur place grâce à un plan interactif, partager leurs photos, laisser un message dans un livre d'or et découvrir les prestataires de l'événement.",
      },
      {
        heading: "Défis rencontrés",
        items: [
          "Sécuriser les données tout en conservant une expérience utilisateur sans création de compte.",
          "Protéger les opérations sensibles (upload, suppression) via des API server-side et les politiques RLS de Supabase.",
          "Gérer les photos HEIC des iPhone et les limitations de taille des requêtes en production sur Vercel.",
          "Assurer la compatibilité Android / iPhone et tester le comportement en conditions réelles (4G, faible débit).",
        ],
      },
      {
        heading: "Solutions mises en place",
        items: [
          "Développement d'API sécurisées avec Next.js utilisant la Service Role Key uniquement côté serveur.",
          "Mise en place des Row Level Security (RLS) sur Supabase.",
          "Compression automatique des images avant l'envoi et conversion des fichiers HEIC en JPEG.",
          "Création d'un espace d'administration permettant de modérer les photos et les messages.",
          "Déploiement continu sur Vercel avec Analytics et Speed Insights.",
        ],
      },
      {
        heading: "Ce que j'en ai appris",
        text: "Ce projet m'a permis de découvrir les problématiques concrètes d'une application utilisée par de vrais utilisateurs : sécurité des données, architecture client/serveur, gestion des médias, déploiement cloud, optimisation des performances et résolution de bugs spécifiques à l'environnement de production. J'y ai également appris l'importance des tests sur différents appareils et réseaux avant une mise en ligne.",
      },
      {
        heading: "Axes d'amélioration",
        items: [
          "DA (direction artisique) plus aboutie.",
          "Permettre le téléchargement des photos par les invités.",
          "Ajout d'une fonction de notification aux mariés et/ou à l'administrateur dès qu'un nouveau message est posté ou une nouvelle photo est ajoutée.",
          "Possibilité de modifier les menus ou le plan de table/la liste d'invités en temps réel.",
        ],
      },
    ],
    screenshots: [
      { src: galerie, alt: "WedQR — Galerie photos" },
      { src: planTable, alt: "WedQR — Plan de table interactif" },
      { src: accueil, alt: "WedQR — Page d'accueil" },
      { src: livreDor, alt: "WedQR — Livre d'or" },
    ],
  },
  {
    id: "hexa decodeur",
    title: "Site vitrine Hexa Décodeur",
    stack:
      "React, Vite, JavaScript (ES6+), CSS3, React Router (navigation initiale puis migration vers une architecture one-page), Cursor (développement assisté par IA), Git & GitHub.",
    sections: [
      {
        heading: "Défi rencontré",
        text: "Créer un portfolio qui ne ressemble pas à un modèle générique tout en restant professionnel, performant et agréable à utiliser sur ordinateur comme sur mobile. L'objectif était également de construire une véritable identité visuelle autour de la marque Hexa Décodeur plutôt qu'une simple vitrine de compétences.",
      },
      {
        heading: "Solutions mises en place",
        text: "Conception d'un site one-page au style cyberpunk inspiré des interfaces HUD, avec une navigation fluide, une identité graphique forte, un « arsenal » interactif présentant les technologies utilisées, ainsi qu'une architecture modulaire en React facilitant les évolutions futures (assistant IA vocal, animations, portfolio enrichi…).",
      },
      {
        heading: "Ce que j'en ai appris",
        items: [
          "Concevoir une véritable identité visuelle cohérente autour d'une marque.",
          "Structurer un projet React de manière modulaire et évolutive.",
          "Trouver le bon équilibre entre créativité, expérience utilisateur et performances.",
          "Exploiter efficacement les assistants IA comme outils de conception et d'accélération du développement, tout en gardant une maîtrise complète des choix techniques.",
        ],
      },
    ],
  },
  {
    id: "cabinet",
    title: "Cabinet infirmier Valence — Site vitrine professionnel",
    stack:
      "React (Create React App), React Router DOM, CSS3, Google Maps Embed, Google Analytics 4, Google Search Console, SEO (Open Graph, Schema.org, Sitemap, robots.txt), Vercel, Git & GitHub.",
    url: "https://cabinetinfirmiervalence81.vercel.app/",
    sections: [
      {
        heading: "Le besoin",
        text: "Concevoir un site vitrine professionnel pour un cabinet infirmier libéral à Valence d'Albigeois (81), présentant l'activité, les soins à domicile et les dispositifs de suivi, tout en inspirant confiance aux patients et facilitant la prise de contact.",
      },
      {
        heading: "Défis rencontrés",
        items: [
          "Mise en place du routage React avec plusieurs pages.",
          "Optimisation de l'affichage sur mobile (menu burger, responsive).",
          "Intégration de services externes (Google Maps, Analytics, Search Console).",
          "Référencement d'un site React (SEO, indexation Google, sitemap, favicon, métadonnées).",
          "Gestion du consentement aux cookies conformément au RGPD.",
        ],
      },
      {
        heading: "Solutions mises en place",
        items: [
          "Création d'une architecture multi-pages avec React Router.",
          "Développement d'une interface responsive adaptée aux smartphones.",
          "Intégration de Google Analytics et de Google Search Console.",
          "Optimisation du référencement grâce aux balises Meta, Open Graph, données structurées (Schema.org), sitemap.xml et robots.txt.",
          "Déploiement continu sur Vercel via GitHub.",
        ],
      },
      {
        heading: "Ce que j'en ai appris",
        text: "Ce projet m'a permis de passer d'une simple application React à un véritable site web de production. J'ai appris à concevoir une architecture propre, intégrer des services Google, optimiser le référencement naturel (SEO), gérer les contraintes du RGPD, automatiser le déploiement et comprendre les enjeux d'une application réellement utilisée par des utilisateurs.",
      },
    ],
  },
]
