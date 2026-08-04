---
title: "Custom Mix Vol. 1"
artist: "Various Artists"
year: 2024

physicalProperties:
  recordLabel: "Personal"
  catalogNumber: "TST-001"
  tapeType: "Type I"
  shell:
    color: "Black"
    transparent: false
  condition: "Mint Condition"

recordingContent:
  type: "compilation"
  sideA:
    - type: "album"
      title: "Nevermind"
      artist: "Nirvana"
      notes: "Original album, tracks 1-5"
    - type: "album"
      title: "In the Aeroplane Over the Sea"
      artist: "Neutral Milk Hotel"
      notes: "Tracks 1-2"
  sideB:
    - type: "album"
      title: "OK Computer (Side B)"
      artist: "Radiohead"
      notes: "Full album, original pressing"
    - type: "personal-recording"
      title: "Custom Recording - Live Session"
      artist: "Local Band / Personal Recording"
      notes: "Bootleg live recording, custom home mix"

artwork:
  jcard:
    status: "designed"
    image: "/cassettes/sample-jcard.jpg"
  labels:
    sideA:
      status: "designed"
      text: "Mix Vol. 1 - Side A - Alternative & Indie"
      image: "/cassettes/sample-label-a.jpg"
    sideB:
      status: "designed"
      text: "Mix Vol. 1 - Side B - Electronic & Experimental"
      image: "/cassettes/sample-label-b.jpg"

location:
  physical:
    shelf: "Sample Shelf"

metadata:
  genres:
    - "Electronic"
    - "Experimental"
  tags:
    - "demo"
    - "testing"
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
- Detailed recordingContent for complex compilations
