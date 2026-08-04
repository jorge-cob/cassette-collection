# Cassette Entry Guide

This project models each cassette as a physical object with its own recorded content, artwork, history, project state, and location.

## File location

Create a markdown file in `src/content/cassettes/`.

Example:

```text
src/content/cassettes/ceci-jay-simpson.md
```

## Required top-level fields

```yaml
---
title: "Carry On Tape"
artist: "Cecilio G"
year: 2022
recordingContent:
  type: "personal-recording"
  sideA: []
  sideB: []
---
```

## Recommended cassette structure

```yaml
---
title: "Carry On Tape"
artist: "Cecilio G"
year: 2022

physicalProperties:
  brand: "Maxell"
  model: "XLII 90"
  tapeType: "Type II"
  shell:
    color: "Black"
    transparent: true
    specialFeatures:
      - "Reinforced shell"
  condition: "Excellent"
  notes: "Clean transport path and solid shell."

recordingContent:
  type: "personal-recording"
  sideA:
    - type: "mixtape"
      title: "Side A Mix"
      artist: "Various Artists"
      duration: "45:00"
      notes: "Original home mix with vocal samples."
      tracks:
        - title: "Intro"
          artist: "Unknown"
          duration: "1:20"
        - title: "Beat One"
          artist: "Sampler"
          duration: "3:30"
  sideB:
    - type: "personal-recording"
      title: "Field Recording"
      notes: "Live rehearsal from 2022."
      duration: "42:00"

artwork:
  jcard:
    status: "designed"
    image: "/cassettes/jcard-front.jpg"
    text: "Handwritten liner notes."
  labels:
    sideA:
      status: "printed"
      text: "Side A"
      image: "/cassettes/label-a.jpg"
    sideB:
      status: "printed"
      text: "Side B"
      image: "/cassettes/label-b.jpg"

history:
  - type: "restoration"
    date: "2026-08-04"
    description: "Cleaned tape heads and replaced shell screws."
  - type: "new-recording"
    date: "2022-04-15"
    description: "Recorded mixtape and annotated tracklist."

project:
  status: "in_progress"
  notes: "Waiting for a printed J-card insert and new case photos."
  tasks:
    - type: "design-jcard"
      status: "done"
    - type: "print-label"
      status: "pending"

location:
  physical:
    shelf: "Main shelf"
    box: "Box A"
    position: 2
  virtualCollections:
    genre: ["Electronic", "Experimental"]
    favourites: true
    personalProjects: ["Tape Archive"]

metadata:
  genres:
    - "Electronic"
    - "Experimental"
  tags:
    - "mixtape"
    - "personal"
---

A short narrative description of the cassette, its origin, and any restoration notes.
```

## Field reference

### Top-level
- `title`: Cassette name or mix title.
- `artist`: Primary creator or performer.
- `year`: Year of the recording or release.

### physicalProperties
- `brand`: Physical tape brand.
- `model`: Tape model.
- `tapeType`: `Type I`, `Type II`, or `Type IV`.
- `shell.color`: Shell color.
- `shell.transparent`: Whether the shell is transparent.
- `shell.specialFeatures`: Additional physical details.
- `condition`: Physical condition summary.
- `notes`: Any cassette-specific notes.

### recordingContent
- `type`: One of: `original`, `album-copy`, `mixtape`, `personal-recording`, `compilation`.
- `sideA` / `sideB`: Lists of recordings on each tape side.
- `type` (per recording): Describes the recorded material.
- `title`: Recording title or mix name.
- `artist`: Optional artist or performer.
- `duration`: Optional total duration.
- `notes`: Optional notes about the recording.
- `tracks`: Optional tracklist for mixtapes/compilations.

### artwork
- `jcard.status`: `missing`, `handwritten`, `designed`, or `printed`.
- `jcard.image`: Optional J-card image path.
- `jcard.text`: Optional handwritten or printed text.
- `labels.sideA` / `labels.sideB`: Label status, image, and text.

### history
- `type`: Modification type (`restoration`, `tape-transplant`, `shell-replacement`, `new-recording`, etc.).
- `date`: Optional date in ISO format.
- `description`: What changed.

### project
- `status`: `pending`, `in_progress`, `done`, or `blocked`.
- `tasks`: Optional task list.
- `notes`: Notes about the cassette project.
- `completedAt`: Optional completion date.

### location
- `physical.shelf`: Physical shelf or storage location.
- `physical.box`: Storage box identifier.
- `physical.position`: Optional numeric position.
- `virtualCollections`: Flexible grouping values for genres, projects, favourites, restoration status, etc.

### metadata
- `genres`: Array of genre strings.
- `tags`: Array of tag strings.

## Notes

This guide is intentionally focused on a clean cassette-first model. Avoid using legacy or compatibility-only fields. Keep each cassette file as a single source of truth for the physical tape and its recorded content.
