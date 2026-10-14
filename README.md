# Site de PDF de mathématiques

Site statique léger (HTML / CSS / JS, aucune dépendance) à héberger gratuitement avec GitHub Pages.

## Structure

```
.
├── index.html       # page unique
├── style.css        # style sobre, thème clair/sombre automatique
├── script.js        # recherche + filtres par catégorie
├── documents.js     # LA LISTE de vos PDF (seul fichier à éditer)
└── pdfs/            # vos fichiers PDF (à créer)
```

## Ajouter un PDF

1. Copiez le fichier dans le dossier `pdfs/` (évitez les espaces et accents dans le nom : `espaces-vectoriels.pdf`).
2. Ajoutez une entrée dans `documents.js` :

```js
{
  titre: "Espaces vectoriels",
  description: "Définitions, exemples et exercices corrigés.",
  categorie: "Algèbre",
  date: "2026-10-20",
  fichier: "pdfs/espaces-vectoriels.pdf"
}
```

3. Commit puis push : le site se met à jour tout seul.

## Publier avec GitHub Pages

1. Sur github.com, créez un nouveau dépôt (public), par exemple `maths`.
2. Envoyez-y tous les fichiers (bouton **Add file → Upload files**, ou `git push`).
3. Dans le dépôt : **Settings → Pages**.
4. Sous **Build and deployment**, choisissez **Deploy from a branch**, branche `main`, dossier `/ (root)`, puis **Save**.
5. Après une minute environ, le site est en ligne à l'adresse :
   `https://VOTRE-PSEUDO.github.io/maths/`

Astuce : un dépôt nommé `VOTRE-PSEUDO.github.io` est servi directement à `https://VOTRE-PSEUDO.github.io/`.

## Test en local

Ouvrez simplement `index.html` dans votre navigateur.

## Personnaliser

- Titre, sous-titre et pied de page : en haut de `documents.js`.
- Couleurs : variables CSS au début de `style.css` (`--accent`, `--fond`, etc.).
