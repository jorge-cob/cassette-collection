# 📼 Cassette Entry Guide

Note: The cassette frontmatter now follows a structured schema with the main sections: physicalProperties, recordingContent, artwork, history, tasks, location and metadata. Keep title, artist and year at the top level for compatibility.

Minimal example (recommended):

```yaml
---
title: "Cassette Title"
artist: "Artist Name"
year: 2024

physicalProperties:
  tapeType: "Type I"
  shell:
    color: "Black"

recordingContent:
  type: "mixtape"
  sides:
    A: []
    B: []

artwork:
  jcard:
    status: "missing"
  labels:
    sideA:
      text: ""
      image: ""
    sideB:
      text: ""
      image: ""

tasks: []

location:
  physical:
    shelf: "My Shelf"

metadata:
  genres: ["Electronic"]
  tags: ["demo"]
---
```


Quick reference for adding cassettes to your library.

## File Format

Each cassette is a **markdown file** in `src/content/cassettes/` with YAML frontmatter.

**Naming**: Use kebab-case for filenames, matching the cassette slug:
```
src/content/cassettes/[slug-name].md
```

## Minimal Entry (Required Fields)

```yaml
---
title: "Cassette Title or Mix Name"
artist: "Main Artist or 'Various Artists'"
year: 2024

recordLabel: "Label Name"

physicalLabels:
  sideA:
    text: "Side A label text"
  sideB:
    text: "Side B label text"

genres:
  - "Genre 1"
  - "Genre 2"

tapeType: "Type I"  # or "Type II" or "Type IV"

aesthetics:
  shellColor: "Color"

originType: "Original"  # or "Recorded from Scratch" or "Transplant"

tags:
  - "tag1"
  - "tag2"

packaging:
  isDoubleBox: false
---

Description of the cassette in markdown format.
```

## Full Entry with Multiple Albums/Artists

```yaml
---
title: "My Compilation Vol. 1"
artist: "Various Artists"
year: 2024
recordLabel: "Personal"
catalogNumber: "PERS-001"

physicalLabels:
  sideA:
    text: "Mix Vol. 1 - Side A"
    image: "/cassettes/my-comp-label-a.jpg"
  sideB:
    text: "Mix Vol. 1 - Side B"
    image: "/cassettes/my-comp-label-b.jpg"

genres:
  - "Electronic"
  - "Experimental"

tapeType: "Type I"

aesthetics:
  shellColor: "Black"
  shellColorSideA: "Black"
  shellColorSideB: "White"
  hasPrismsOrWindows: false

media:
  coverFront: "/images/cassettes/my-comp-front.jpg"
  caseWithTape: "/images/cassettes/my-comp-case.jpg"
  tapeSideA: "/images/cassettes/my-comp-a.jpg"
  tapeSideB: "/images/cassettes/my-comp-b.jpg"
  jcardFullSpread: "/images/cassettes/my-comp-jcard.jpg"

originType: "Recorded from Scratch"
isCustomArt: true
condition: "Excellent"  # Options: Excellent, Mint Condition, Mechanically Damaged, Missing J-Card, Rescued (Needs Cleaning)

shelving:
  physical:
    name: "My Shelf"
  byGenre: "Genre Name"
isDonor: false

tags:
  - "compilation"
  - "personal-mix"

pendingTasks:  # Optional - for tape restoration/creation
  - "create-labels"
  - "record-audio"

packaging:
  isDoubleBox: false

digitalSource:  # Optional - if you have/want FLAC versions
  searchQuery: "album name artist"
  hasFlacAcquired: true
  isReadyToRecord: true

contentStructure:
  - albumTitle: "Album A - Side A"
    artist: "Artist A"
    side: "A"
    notes: "Tracks 1-6"
  - albumTitle: "Album B - Side A"
    artist: "Artist B"
    side: "A"
    notes: "Complete album"
  - albumTitle: "Album C - Side B"
    artist: "Artist C"
    side: "B"
    notes: "Partial, first 5 tracks"
  - albumTitle: "Custom Home Recording"
    artist: "Local Band / Personal"
    side: "B"
    notes: "Bootleg live session"
---

Detailed description and notes about the cassette.
```

## Field Reference

### Required Fields
- **title**: Cassette/mix name
- **artist**: Main artist or "Various Artists"
- **year**: Release/recording year
- **genres**: Array of genre strings
- **tapeType**: Type I, Type II, or Type IV
- **aesthetics**: Shell color details
- **originType**: Original, Recorded from Scratch, or Transplant
- **tags**: Array of descriptive tags
- **packaging**: Box configuration

### Optional Fields
- **recordLabel**: Record label name (e.g., "Warner Bros", "Personal")
- **catalogNumber**: Label catalog number
- **physicalLabels**: Text and/or images of the label stickers on Side A and Side B
- **transplantDetails**: Details about tape source and recording if originType is 'Transplant'
- **shelving**: Multi-dimensional organization (physical location + virtual classifications)
- **media**: Links to image files (photos of cassette/case/jcard)
- **condition**: Physical condition (defaults to "Mint Condition")
- **isDonor**: If cassette is designated as donor (for parts)
- **isCustomArt**: If custom artwork was created
- **pendingTasks**: Tasks needed (labeling, recording, repairs, etc.)
- **digitalSource**: Metadata if you're acquiring/have FLAC versions
- **contentStructure**: Detailed track/album listings per side

### Condition Options
- Excellent
- Mint Condition
- Mechanically Damaged
- Missing J-Card
- Rescued (Needs Cleaning)

### Shelving Structure

Use `shelving` for multi-dimensional organization. The `physical` entry shows your actual shelf location.

**Available fields:**
- `physical.name` - Physical shelf name (e.g., "Trap Shelf")
- `physical.shelf` - Specific physical location (future use)
- `physical.position` - Index on shelf (future use)
- `byGenre` - Genre classification
- `byArtist` - Artist classification
- `byYear` - Year classification
- `byMood` - Mood/vibe classification
- `byCondition` - Condition classification
- `custom1`, `custom2`, `custom3` - Custom classifications

### Pending Tasks
- create-labels
- create-jcard
- paint-cassette
- record-audio
- repair-felt
- clean-grease

## Quick Copy-Paste Template

```yaml
---
title: ""
artist: ""
year: 
recordLabel: ""

physicalLabels:
  sideA:
    text: ""
  sideB:
    text: ""

genres:
  - ""

tapeType: "Type I"

aesthetics:
  shellColor: ""

originType: "Original"

transplantDetails:  # Only if originType is 'Transplant'
  tapeSource: "New Blank Tape"
  recordedOver: false

tags:
  - ""

packaging:
  isDoubleBox: false
---

Notes here.
```

## Tips for Speed Entry

1. **Start simple**: Use minimal entries first, add media/contentStructure later
2. **Batch by shelf**: Group entries by where they're stored
3. **Use partial data**: You can add images and details later
4. **Markdown body**: Add any extra notes/observations after the frontmatter
5. **Multiple artists**: Use `contentStructure` array for compilations/mixtapes
6. **Split albums**: You can have same album on both sides with different track ranges
7. **Physical labels**: Add text and/or image paths for Side A and Side B labels separately
8. **Transplant info**: When originType is 'Transplant', provide tapeSource and recordedOver details

## File Location
```
src/content/cassettes/[your-slug-name].md
```

Example slugs:
- `nirvana-nevermind.md`
- `my-mix-vol-1.md`
- `various-electronica-compilation.md`
- `bootleg-live-session-2023.md`
