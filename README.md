# Cassette Culture

A personal Astro app for managing a physical cassette collection. This project is designed around the cassette as a physical object, not as a generic music catalog.

## Project Purpose

This application helps you store, track, and document individual cassette tapes. Each cassette is modeled as a unique physical artifact with:

- identity and physical properties
- recorded content per side
- artwork and labels
- restoration or modification history
- project status and tasks
- physical and virtual location metadata
- tags and genres for collection organization

## Stack

- Astro for the frontend framework
- Astro Content Collections for cassette data modeling
- Zod for schema validation
- TypeScript strict mode enabled

## Project Structure

```text
src/
  content/
    cassettes/
  schemas/
  pages/
  components/
  utils/
src/content.config.ts
```

## Adding a new cassette

Create a markdown file under `src/content/cassettes/` with YAML frontmatter.

The minimal cassette entry includes:

- `title`
- `artist`
- `year`
- `recordingContent` with `sideA` and `sideB`

See `CASSETTE_ENTRY_GUIDE.md` for a complete example and recommended structure.

## Domain model

This app uses a clean cassette-first schema with the following top-level sections:

- `title`, `artist`, `year`
- `physicalProperties`
- `recordingContent`
- `artwork`
- `history`
- `project`
- `location`
- `metadata`

### Highlights

- `physicalProperties` describes the tape as an object: brand, model, tape type, shell, condition, and notes.
- `recordingContent` describes what is recorded on the tape, separated by `sideA` and `sideB`.
- `artwork` stores J-card and label status, images, and text.
- `history` stores restoration and modification events.
- `project` treats the cassette as a work in progress with status, tasks, notes, and optional completion date.
- `location` stores physical placement and virtual collections for grouping.
- `metadata` stores transversal data like genres and tags.

## Future roadmap

This project is intentionally built for future growth:

- better cassette entry UI and admin workflows
- richer cassette detail pages
- image galleries and condition documentation
- backend storage and API integration
- import/export for physical collection management

## Notes

The current implementation is content-driven. The domain model is intentionally clean and free of compatibility cruft. Future iterations can add persistence, search, and admin tools while keeping this cassette-first structure.
