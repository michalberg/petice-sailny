# Petice: Neomezujte šaliny v centru Brna!

Webová stránka petice Strany zelených proti omezení tramvajového provozu v centru Brna.

**Živá stránka:** https://michalberg.github.io/petice-sailny/

## Technologie

- [Astro](https://astro.build/) 6 — statický generátor
- [Tailwind CSS](https://tailwindcss.com/) v4
- React — komponenta Accordion
- [Action Network](https://actionnetwork.org/) — backend pro sběr podpisů

## Struktura projektu

```
src/
  config/
    petition.json   # veškerý obsah stránky (texty, formulář, autoři, alternativy)
    config.json     # nastavení webu (název, logo, patička)
  pages/
    index.astro     # hlavní stránka
  layouts/
    Base.astro      # základní layout (hlavička, patička)
    components/
      PetitionText.astro  # text petice
    partials/
      Header.astro
      Footer.astro
  styles/
    main.css        # Tailwind + vlastní styly
    base.css        # font Tusker Grotesk, nadpisy
public/
  images/           # fotky, SVG vzory tramvaje, logo
  fonts/            # Tusker Grotesk (woff, woff2)
```

## Editace obsahu

Veškerý obsah (texty, autoři, formulář, alternativy) se upravuje v souboru `src/config/petition.json`.

### Action Network

V `petition.json` nastav správné `endpoint_id` formuláře:

```json
"action_network": {
  "endpoint_id": "GUID-FORMULARE",
  "tags": ["sailny"]
}
```

### Autoři

Fotky autorů patří do `public/images/` (doporučená velikost: čtverec, min. 200×200 px).

## Lokální vývoj

```bash
npm install
npm run dev
```

## Deploy

Stránka se automaticky nasazuje na GitHub Pages přes GitHub Actions při každém pushnutí na větev `main`.
