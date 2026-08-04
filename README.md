# Astro Starter Kit: Minimal

```sh
npm create astro@latest -- --template minimal
```

> 🧑‍🚀 **Seasoned astronaut?** Delete this file. Have fun!

## 🚀 Project Structure

Inside of your Astro project, you'll see the following folders and files:

```text
/
├── public/
├── src/
│   └── pages/
│       └── index.astro
└── package.json
```

Astro looks for `.astro` or `.md` files in the `src/pages/` directory. Each page is exposed as a route based on its file name.

There's nothing special about `src/components/`, but that's where we like to put any Astro/React/Vue/Svelte/Preact components.

Any static assets, like images, can be placed in the `public/` directory.

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

## 👀 Want to learn more?

Feel free to check [our documentation](https://docs.astro.build) or jump into our [Discord server](https://astro.build/chat).


## Data model (summary)

This project uses a structured cassette schema designed for a physical cassette collection. The key sections in cassette frontmatter are:

- physicalProperties: brand, model, tapeType, shell (color, transparency, specialFeatures), condition, notes
- recordingContent: type (original, album-copy, mixtape, personal-recording, compilation) and sides (A/B) with items per side (artist, title, type, notes, duration)
- artwork: jcard (status/images/text), labels (sideA/sideB with text/image)
- history: chronological modifications and restorations
- tasks: per-cassette tasks with type and status
- location: physical shelf/box/position and flexible virtualCollections
- metadata: genres, tags, recordLabel, catalogNumber, notes

Top-level: title, artist and year remain as top-level fields for compatibility with existing pages.

This README is a lightweight reference; see CASSETTE_ENTRY_GUIDE.md for examples and templates.

