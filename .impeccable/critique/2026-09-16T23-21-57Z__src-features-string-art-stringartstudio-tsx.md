---
target: src/features/string-art/StringArtStudio.tsx
total_score: 22
max_score: 40
na_heuristics: 
p0_count: 0
p1_count: 2
timestamp: 2026-09-16T23-21-57Z
slug: src-features-string-art-stringartstudio-tsx
---
Method: dual-agent (A: ac82ac19-0f71-4c1e-b9f8-b661693364df · B: f1ebdd2f-1a2a-4847-87d2-741efa8c4c77)

### Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|:-----:|-----------|
| 1 | Visibility of System Status | 3 | Good real-time line streaming, but lacks ETA countdown, percentage completion bar, or lines/sec speed. |
| 2 | Match System / Real World | 2 | Abstract vector circle; lacks physical substrate textures (birch/obsidian), pin marks, thread spool meterage, or angular clock notation. |
| 3 | User Control and Freedom | 3 | Solid canvas pan/zoom and pause/resume/stop; lacks preset reset or A/B parameter history comparison. |
| 4 | Consistency and Standards | 3 | Clean adherence to Radix/Tailwind design tokens and standard slider interactions. |
| 5 | Error Prevention | 2 | Sliders allow dense muddy thread buildup without pre-flight warnings; image upload lacks contrast/edge detection check. |
| 6 | Recognition Rather Than Recall | 2 | Tabbed sidebar forces memorizing pin count when adjusting chord distance; preset recommendations (`recommendedLines`/`recommendedPins`) are discarded on selection. |
| 7 | Flexibility and Efficiency | 2 | Zero keyboard shortcuts (`Space` to play/pause, `Enter` to weave, `[`/`]` to step lines, `R` to reset zoom); physical weavers cannot work hands-free. |
| 8 | Aesthetic and Minimalist Design | 2 | Generic SaaS look: slate borders, flat white disc, generic blueprint grid, and tech-dashboard styling. |
| 9 | Error Recovery | 2 | Worker failures log only to console; no user-facing recovery guidance if image decoding or buffer fails. |
| 10 | Help and Documentation | 1 | Tooltips are brief 1-line labels; lacks visual algorithm explanation, image selection guidelines, or physical fabrication tutorial. |
| **Total** | | **22/40** | **Needs Work (20–27)** |

### Design Specificity Verdict

#### LLM Assessment (Unanchored Design Review)
**Verdict: Category-Interchangeable Utility Shell.**  
`StringArtStudio` is currently wrapped in the visual uniform of a generic SaaS analytics or AI-generator dashboard: cool slate-zinc cards, flat 2D white vector disc with black hairline strokes, standard Shadcn-like tabs (`Muestras`, `Bastidor`, `Algoritmo`), and default digital purple/blue accents. If you replace the central circle with an image upscaler, the UI chrome wouldn't look out of place.

It misses the soul of **String Art**—a tactile, meditative craft where kilometers of continuous physical thread are strung under high tension around brass pins pounded into birch wood or velvet. The interface should feel like an authentic **Computational Artisan Workshop & Optical Drafting Bench**:
- **Materiality & Substrates:** Choice of authentic materials (e.g. *Nordic Birch Ply* with brass pins and charcoal thread, or *Obsidian Darkroom* with matte velvet and luminous gold thread).
- **Physical Instrument Details:** Radial pin graduation marks on the rim (astrolabe / chronometer style), calibrated vernier dials, and physical spool thread gauges.
- **Atmospheric Stage Lighting:** Focused, dramatic vignette lighting illuminating the loom disc to highlight the moiré interference patterns.

#### Deterministic Scan (Automated Detector)
- **Files scanned:** 37 files in `src/features/string-art/`.
- **Findings in component tree:** **0 anti-patterns detected.** The codebase is clean of synthetic AI slop (no generic gradient texts, no left-border accent stripes, no arbitrary spring bounces).
- **Workspace finding:** 1 advisory finding (`codex-grid-background`) on `src/app/globals.css:100` (`.studio-grid`).
- **False Positive Validation:** Confirmed **False Positive**. The Impeccable rule explicitly exempts actual canvas, CAD, and drafting surfaces.

### Overall Impression
The underlying computational engine (Web Worker, greedy mathematical raycasting, canvas viewport, real-time thread length calculation) is exceptionally well-engineered and performant. However, the interface treats this hypnotic art form like a generic file downloader, severing the emotional bridge between digital generation and physical craftsmanship.

### What's Working
1. **High-Performance Worker Pipeline:** Non-blocking 60 FPS streaming calculation capable of computing 4,000+ chords without freezing the UI.
2. **Fabrication Reality Calculations:** Accurate real-world meters of thread calculated dynamically based on loom diameter, plus sequential pin-to-pin export.
3. **Smooth Viewport & Touch Ergonomics:** Natural pointer pan, wheel zoom, and mobile auto-fit that adapts cleanly to small screens.

### Priority Issues (P0–P3)

#### [P1] Category-Interchangeable "Generic SaaS" Aesthetic
- **Why it matters:** The interface looks like a generic web developer tool rather than a specialized atelier for a tactile craft.
- **Fix:** Introduce an authentic **Artisan Studio Visual World**: tactile wood/obsidian substrate options, brass pin rim graduations, and physical thread spool indicators.
- **Suggested Command:** `$impeccable bolder src/features/string-art/StringArtStudio.tsx`

#### [P1] Disconnected Weaving Assistant Modal
- **Why it matters:** Stringing a real piece takes 10–20 hours. Opening a blocking dialog modal completely hides the canvas and turns the guide into a sterile number counter.
- **Fix:** Replace the modal with an integrated **"Artisan Weaving Mode" / Physical Workbench View**: spotlight the active pin on the canvas, illuminate the trajectory chord, provide large high-contrast numbers, and add audio cues.
- **Suggested Command:** `$impeccable layout src/features/string-art/components/player/`

#### [P2] Inactive Preset Intelligence (Lost Guidance)
- **Why it matters:** `SAMPLE_PRESETS` defines tailored recommendations (`recommendedLines`, `recommendedPins`), but selecting a preset only swaps the image, discarding the tuned parameters and leaving users to guess.
- **Fix:** Automatically surface or apply recommended parameters when selecting a preset, with a one-click "Aplicar valores óptimos" action.
- **Suggested Command:** `$impeccable clarify src/features/string-art/components/sidebar/PresetGallery.tsx`

#### [P2] Jarring Layout Shift on Timeline Player
- **Why it matters:** `TimelinePlayer` conditionally mounts only when `totalLines > 1`, causing an abrupt 56px canvas reflow when generation completes or resets.
- **Fix:** Maintain a calm docked bottom dock in all states or use smooth layout transitions.
- **Suggested Command:** `$impeccable animate src/features/string-art/components/player/TimelinePlayer.tsx`

#### [P3] Zero Keyboard Shortcuts
- **Why it matters:** Artisans and power users with hands holding physical thread or tools cannot advance steps or pause efficiently with tiny buttons.
- **Fix:** Add global hotkeys: `Space` (Play/Pause), `Enter` (Generate), `[` / `]` (Step lines), `R` (Reset zoom).
- **Suggested Command:** `$impeccable polish src/features/string-art/StringArtStudio.tsx`

### Persona Red Flags

- **Alex (Power User / Digital Fabricator):**
  - Cannot adjust loom diameter and algorithm parameters side-by-side because they are trapped in separate tabs.
  - No keyboard shortcuts for repetitive iteration.
  - Export requires multiple individual downloads instead of a single complete fabrication zip package (SVG + TXT + PNG reference + Bill of Materials).
- **Jordan (Confused First-Timer):**
  - Uploading a low-contrast image creates a muddy, unrecognizable blob with zero guidance on how to fix it.
  - Preset recommended lines and pins are silently ignored, forcing trial-and-error slider tweaking.
  - Jargon like *"Distancia mín. de cuerda"* provides no visual cue of what it actually changes.
- **Casey (Distracted Mobile User):**
  - Opening the drawer on mobile completely conceals the canvas; cannot see sliders affect the preview.
  - Timeline slider scrubber has a narrow touch target that collides with mobile gesture navigation.
  - Header project stats are hidden entirely on small viewports.

### Minor Observations
- Dark mode renders the canvas as a stark white disc; an inverted dark velvet/wood board with metallic/gold thread would create a breathtaking aesthetic.
- Sliders allow selecting 4,000+ lines with high opacity, creating over-saturated results with no density warning.
- Pin graduation numbers are missing around the circular frame, making physical pin correlation difficult.

### Questions to Consider
- What if String Art Studio felt like a physical Swiss drafting bench or luthier's workshop rather than a SaaS tool?
- What if generation was an ambient, cinematic performance with thread tension and glowing active pin traversal?
- What if the Weaving Assistant spoke pin numbers aloud hands-free for crafters working on a physical board?
