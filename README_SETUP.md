# Web Invitation Demo (Multilingual)

## What you get
- Static website (GitHub Pages compatible)
- RSVP + Guest Wall email notifications via Formspree
- Multilingual UI:
  - JSON locale files (locales/en.json, es.json, fr.json, tr.json)
  - Dropdown language selector
  - Automatic browser-language detection
  - Remembers user choice (localStorage)

## Setup (GitHub Pages)
1) Upload the contents of the `invite/` folder to your repo root
2) GitHub → Settings → Pages → Deploy from branch → main / root
3) Open your site

## Enable email (Formspree)
Edit: `js/config.js`
- Replace:
  endpoint: "https://formspree.io/f/XXXXYYYY"
  with your real endpoint.

## Add more languages
1) Copy an existing locale file (e.g. locales/en.json) → locales/de.json
2) Translate the values
3) Add "de" to `supportedLocales` in `js/config.js`
