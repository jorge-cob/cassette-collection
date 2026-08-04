---
title: "Custom Mix Vol. 1"
artist: "Various Artists"
year: 2024

metadata:
  recordLabel: "Personal"
  catalogNumber: "TST-001"
  genres:
    - "Electronic"
    - "Experimental"
  tags:
    - "demo"
    - "testing"
  legacy_media:
    coverFront: "/cassettes/sample-front.jpg"
    caseWithTape: "/cassettes/sample-case.jpg"
    tapeSideA: "/cassettes/sample-side-a.jpg"
    tapeSideB: "/cassettes/sample-side-b.jpg"
    jcardFullSpread: "/cassettes/sample-jcard.jpg"

tapeType: "Type I"
originType: "Original"

physicalProperties:
  tapeType: "Type I"
  shell:
    color: "Black"
  condition: "Mint Condition"

recordingContent:
  type: "compilation"
  sides:
    A:
      - artist: "Nirvana"
        title: "Nevermind"
        type: "album"
        notes: "Original album, tracks 1-5"
      - artist: "Neutral Milk Hotel"
        title: "In the Aeroplane Over the Sea"
        type: "album"
        notes: "Tracks 1-2"
    B:
      - artist: "Radiohead"
        title: "OK Computer (Side B)"
        type: "album"
        notes: "Full album, original pressing"
      - artist: "Local Band / Personal Recording"
        title: "Custom Recording - Live Session"
        type: "personal-recording"
        notes: "Bootleg live recording, custom home mix"

artwork:
  jcard:
    status: "designed"
    images:
      front: "/cassettes/sample-front.jpg"
      back: "/cassettes/sample-case.jpg"
  labels:
    sideA:
      text: "Mix Vol. 1 - Side A - Alternative & Indie"
      image: "/cassettes/sample-label-a.jpg"
    sideB:
      text: "Mix Vol. 1 - Side B - Electronic & Experimental"
      image: "/cassettes/sample-label-b.jpg"

location:
  physical:
    shelf: "Sample Shelf"

tasks: []
---

This is a sample **compilation/mixtape cassette** that demonstrates how to catalog multiple artists and albums on a single tape.

## Structure
This cassette contains:
- **Side A**: Mix of album tracks (Nirvana + Neutral Milk Hotel)
- **Side B**: Complete Radiohead album + custom home recording

## Key Features Demonstrated
- Multiple artists on one cassette
- Mix of commercial albums and custom content
- Split albums across multiple sides
- Bootleg/personal recordings alongside originals
- Detailed `contentStructure` for complex compilations
