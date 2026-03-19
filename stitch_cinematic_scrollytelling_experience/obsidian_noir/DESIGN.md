# Design System Documentation: The Cinematic Monolith

## 1. Overview & Creative North Star
**Creative North Star: The Cinematic Monolith**

This design system is engineered for high-impact scrollytelling. It moves away from the "app-like" density of traditional dashboards toward a "High-End Editorial" experience. The goal is to treat the screen as a cinematic canvas where the void (pure black) is as important as the content. 

We break the "template" look through **Intentional Asymmetry**. By utilizing the extreme ends of our spacing scale and bold typography shifts, we create a rhythm that feels curated rather than generated. Elements should overlap, bleed off-canvas, and emerge from the darkness using tonal depth rather than structural lines.

---

## 2. Colors & Atmospheric Depth
Our palette is rooted in the interplay between absolute darkness and pure light.

### The "No-Line" Rule
**Explicit Instruction:** Designers are prohibited from using 1px solid borders to define sections. Boundaries must be defined solely through background color shifts or subtle tonal transitions. For example, a section transition should move from `surface` (#131313) to `surface_container_low` (#1B1B1B) to signal a change in context.

### Surface Hierarchy & Nesting
Treat the UI as a series of physical layers. Use the surface-container tiers to create depth:
- **Base Layer:** `surface` (#131313) or `surface_container_lowest` (#0E0E0E).
- **Secondary Narrative Layer:** `surface_container` (#1F1F1F).
- **Interactive/Floating Layer:** `surface_bright` (#393939) with Glassmorphism.

### The "Glass & Gradient" Rule
To avoid a "flat" digital look, use Glassmorphism for floating navigation and overlays. Combine `surface_container_high` (#2A2A2A) at 60% opacity with a `backdrop-blur` of 20px. 

### Signature Textures
For primary CTAs or high-impact hero sections, use a subtle linear gradient transitioning from `primary` (#FFFFFF) to `secondary` (#C8C6C5) at a 45-degree angle. This adds a "metallic" silkiness that flat white cannot achieve.

---

## 3. Typography: Cinematic Narrative
Typography is our primary architectural tool. We use a three-font system to establish authority and technical precision.

- **The Hero (Epilogue):** Used for `display` and `headline` levels. It is bold, wide, and cinematic. Use `display-lg` (3.5rem) for scrollytelling "beat" moments to stop the user in their tracks.
- **The Narrator (Manrope):** Used for `title` and `body` levels. It provides a clean, modern readability that balances the aggression of Epilogue.
- **The Metadata (Space Grotesk):** Used for `label` levels. The monospaced feel adds a "technical dossier" aesthetic to captions and small data points.

**Hierarchy Note:** Always lead with high contrast. A `display-lg` headline should often be paired with a `body-sm` description to emphasize the scale of the message.

---

## 4. Elevation & Depth
In this design system, shadows are light, and layers are felt, not seen.

### The Layering Principle
Stack tiers to create natural lift. Place a `surface_container_highest` (#353535) card on a `surface_container_low` (#1B1B1B) section. This 2-tier jump creates a sophisticated "lift" without artificial effects.

### Ambient Shadows
For floating elements, use "Atmospheric Shadows":
- **Blur:** 40px - 80px.
- **Spread:** -10px.
- **Color:** `on_surface` (#E2E2E2) at 4% opacity. 
This mimics a soft glow reflecting off a dark surface rather than a traditional "drop shadow."

### The "Ghost Border" Fallback
If a container requires a boundary for accessibility, use a **Ghost Border**: `outline_variant` (#474747) at 15% opacity. Never use 100% opaque outlines.

---

## 5. Components

### Buttons (The Minimalist Interaction)
- **Primary:** Background `primary` (#FFFFFF), Text `on_primary` (#1A1C1C). 
- **Secondary:** Ghost style. No background, Ghost Border (15% opacity `outline_variant`), Text `primary`.
- **Transitions:** All buttons must use a `300ms cubic-bezier(0.22, 1, 0.36, 1)` transition for hover states. On hover, the button should subtly scale (1.02x) and increase shadow diffusion.

### Cards & Lists
- **Rule:** Forbid divider lines. 
- **Execution:** Separate list items using `spacing-4` (1.4rem) or by alternating background tones between `surface_container_low` and `surface_container`.
- **Roundedness:** Use `md` (0.375rem) for internal elements and `xl` (0.75rem) for main content containers to maintain a sophisticated, slightly softened edge.

### Input Fields
- **Aesthetic:** Ultra-minimal. Only a bottom "Ghost Border" that expands to a full `primary` (#FFFFFF) underline on focus.
- **Label:** Use `label-md` (Space Grotesk) in `on_surface_variant` (#C6C6C6), shifting to `primary` on focus.

### Scrollytelling Progress (Custom Component)
- **The "Pulse" Indicator:** A floating vertical line on the right edge. Use `surface_container_highest` as the track and a `primary` (#FFFFFF) glow for the progress indicator.

---

## 6. Do's and Don'ts

### Do:
- **Embrace Negative Space:** Use `spacing-20` (7rem) and `spacing-24` (8.5rem) between major narrative beats to let the typography breathe.
- **Use Intentional Asymmetry:** Offset text blocks to the left or right of the center axis to create a "magazine" feel.
- **Animate Transitions:** Use the "smooth transition" ethos. Elements should fade and slide 20px vertically as they enter the viewport.

### Don't:
- **Don't use pure grey (#808080):** Always use our tiered neutrals (`on_surface_variant`, `outline`) to maintain the specific color temperature.
- **Don't use "Card Fatigue":** Avoid putting everything in boxes. Let text sit directly on the `background` to maintain the cinematic flow.
- **Don't use standard easing:** Avoid `ease-in-out`. Use the custom cubic-bezier mentioned in the Buttons section for a "premium" feel.