# grandas.ch – site Astro

Nouveau site de **Grandas – Carrelage & Rénovation** (Romanel-sur-Lausanne), construit avec [Astro](https://astro.build).
Il remplace l'ancien thème Jekyll « Freelancer » avec un design moderne, des galeries de plusieurs photos par prestation et quatre langues.

- Français (par défaut) : `/`
- Anglais : `/en/` · Allemand : `/de/` · Italien : `/it/`

## Démarrer

Node **20 ou plus récent** est requis (Astro 5 refuse Node 18.17). Avec nvm : `nvm use` (lit `.nvmrc`).

```bash
npm install
npm run dev       # http://localhost:4321
npm run build     # génère le site statique dans dist/
npm run preview   # prévisualise dist/
```

Sans Node 20 installé, on peut lancer la build via npx : `npx -y -p node@20 -- npm run build`.

## Mettre à jour le contenu

Tout le contenu éditable est dans trois endroits, aucun code à toucher.

### 1. Prestations – `src/content/services/*.yaml`

Un fichier par prestation. Chaque fichier contient l'ordre d'affichage, la liste des photos et le texte dans les 4 langues :

```yaml
order: 1
images:
  - src: ../../assets/services/ma_photo_1.jpg
  - src: ../../assets/services/ma_photo_2.jpg
    alt: { fr: "Description", en: "Description", de: "...", it: "..." }   # facultatif
fr:
  title: Titre
  summary: Une phrase courte affichée sur la carte.
  description: Texte complet affiché dans la fenêtre de détail.
  tip: Conseil facultatif, mis en avant dans un encadré.
en: { ... }
de: { ... }
it: { ... }
```

- **Ajouter une photo** : déposer le fichier dans `src/assets/services/` et ajouter une ligne `- src:` dans le YAML. La première photo sert de couverture. Astro redimensionne et convertit les images en WebP à la build.
- **Ajouter une prestation** : créer un nouveau fichier `.yaml` dans le même dossier.
- **Supprimer / réordonner** : supprimer le fichier ou changer `order`.
- Pour alléger des photos de téléphone avant de les ajouter : `node scripts/resize.mjs <dossier-source> src/assets/services` (max 2000 px, EXIF retiré, orientation corrigée).

### 2. Coordonnées – `src/data/site.ts`

Nom, adresse, téléphone, e-mail, horaires, slogan par langue et l'adresse du formulaire de contact (Formspree).

### 3. Textes de l'interface – `src/i18n/ui.ts`

Tous les titres, boutons, textes de la page d'accueil, de la section « Qui sommes-nous » et du formulaire, pour chaque langue.
Pour ajouter une langue : l'ajouter dans `languages` et `ui`, dans `astro.config.mjs` (`i18n.locales`), puis dans `tagline`/`hours` de `site.ts` et dans chaque YAML de prestation.

## Structure

```
src/
  assets/services/     photos des prestations (optimisées à la build)
  content/services/    une fiche YAML par prestation
  content.config.ts    schéma de validation des fiches
  data/site.ts         coordonnées de l'entreprise
  i18n/ui.ts           traductions de l'interface
  layouts/Base.astro   <head>, SEO, hreflang, polices
  components/          Nav, Hero, Services (cartes + galerie lightbox), About, Contact, Footer
  pages/index.astro    page française (racine)
  pages/[lang]/        pages en / de / it
public/                logo, favicon, CNAME
scripts/resize.mjs     utilitaire pour réduire les photos
```

## Formulaire de contact

Le formulaire envoie vers Formspree (`formAction` dans `site.ts`). Après envoi, Formspree renvoie sur la page avec `?sent=1` et un message de confirmation s'affiche. Pour changer l'adresse e-mail de réception, se connecter sur formspree.io.

## Déploiement

Le workflow `.github/workflows/deploy.yml` construit et publie le site sur GitHub Pages à chaque push sur `main` (activer Pages → Source : *GitHub Actions* dans les réglages du dépôt). Le fichier `public/CNAME` conserve le domaine `www.grandas.ch`.
