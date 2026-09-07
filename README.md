# Devin — YouTube Website

Pure static GitHub Pages site. No React, Vite, npm, build step, backend, database, or framework.

## Structure
- `index.html` — home
- `about.html` — about
- `tutorials/` — tutorial index + individual tutorial pages
- `posts/` — post index + individual posts
- `files/` — resource index + individual resource pages
- `downloads/` — put downloadable files here
- `css/style.css` — shared styling
- `js/main.js` — small client-side search behavior
- `assets/logo.png` — channel logo

## GitHub Pages
Push the entire folder to a repository, then enable GitHub Pages from the repository's Settings → Pages. Deploy from the main branch and repository root.

## Adding content
Duplicate an existing detail page, edit it, and add a card/row on the matching index page. Use relative links so it works under `username.github.io/repository-name/`.

## Downloads
Put files in `downloads/` and link to them with the correct relative path. For very large files, use GitHub Releases instead of committing them to the repository.
