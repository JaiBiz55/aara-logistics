# AARA Logistics Baseline 2

Saved: 2026-09-29

This is the current rollback point for the AARA Logistics website after the video-led redesign and service-specific video updates. Baseline 1 remains preserved separately in `aara-logistics-baseline.zip` with its original notes in `BASELINE.md`.

## Website state

- Replaced the homepage and service-page 3D scenes with locally hosted video scenes and lightweight animated route graphics.
- The homepage hero keeps the three owner-supplied motion clips selectable.
- The homepage Warehouse Solutions feature uses supplied clip 2 only; clip 1 stays in the hero.
- The Warehouse Solutions detail page uses clip 2 in both warehouse video panels.
- Supply Chain Solutions uses supplied clip 3.
- The other service pages use matching locally hosted stock videos. Source links and credits are documented in `public/media/services/SOURCES.md`.
- Video scenes include the existing route path, tracking display, progress, and playback controls; they load and play when visible.
- The blue and gold visual design, existing page copy, navigation, homepage sections, and ten service pages are preserved.
- The PDF page-content guide is saved at `output/pdf/aara-website-page-content-guide.pdf`.

## Pages included

- Homepage: `/`
- Supply Chain Solutions: `/services/supply-chain-solutions`
- Warehouse Solutions: `/services/warehouse-equipment-rental`
- Transportation FTL: `/services/transportation-ftl`
- First Mile: `/services/first-mile`
- Middle Mile: `/services/middle-mile`
- Last Mile: `/services/last-mile`
- Quick Commerce: `/services/quick-commerce`
- Dark Store Solutions: `/services/dark-store-solutions`
- Delivery Solutions: `/services/delivery-solutions`
- Ecom Solution: `/services/ecom-solution`

## Verification at save time

- `npx tsc --noEmit` completed successfully.
- All ten service routes and all ten downloaded service video files responded successfully during local preview checks.
- Browser playback confirmed the warehouse and supply-chain clips were playing; no browser console errors were reported.
- Development preview: `http://127.0.0.1:3000/`

## Restore

Extract `aara-logistics-baseline-2.zip` into a fresh folder, then run `npm install` and `npm run dev`.
