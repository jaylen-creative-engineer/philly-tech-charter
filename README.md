# Philadelphia Tech Charter

A living document written in Philadelphia on the occasion of America's 250th year — establishing a collective intention for how we integrate AI and technology with culture, for the benefit of everyone.

## Project Structure

```
philly-tech-charter/
├── index.html       # Single-page document app (v1)
└── README.md        # This file
```

## Vision

This is a single-page web experience that:
- Introduces the reader to the purpose and context of the document
- Presents the living document itself (preamble + sections + principles)
- Invites open public contributions
- Surfaces submitted voices in real time

## Design System

Built on the Nike DESIGN.md reference with a custom dark-mode identity:

| Token | Value |
|---|---|
| Base | `#0d0d0d` |
| Off-white | `#e8e6df` |
| Volt accent | `#c8f135` |
| Display font | Instrument Serif |
| Body font | DM Sans |

## Roadmap

### v1 (current)
- [x] Hero with 250 ghost type
- [x] Intro framing section
- [x] Full-bleed statement block
- [x] Document body (Preamble + 3 sections)
- [x] Six core principles grid
- [x] Contribution form (in-session)
- [x] Live voices section

### v1.1 (next)
- [ ] Backend for persistent contributions (Supabase or similar)
- [ ] Changelog / version history view
- [ ] Email capture for contributors
- [ ] Shareable anchor links per section/principle

### v2
- [ ] Versioned document diffs (v1 → v1.1 → v2)
- [ ] Annotation layer on document text
- [ ] Public API for the document content
- [ ] Multi-language support

## Running Locally

No build step required. Open `index.html` directly in a browser, or serve with any static server:

```bash
npx serve .
# or
python3 -m http.server 3000
```
