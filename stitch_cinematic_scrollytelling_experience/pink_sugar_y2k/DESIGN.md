# Design System Document

## 1. Overview & Creative North Star
### Creative North Star: "The Sugar-Coated Riot"
This design system rejects the clinical, sanitized aesthetics of modern SaaS. It is a high-energy, streetwear-inspired framework that fuses the playful excess of Y2K "Pink Sugar" culture with a modern, high-end editorial structure. It is designed to feel "loud" yet intentional, utilizing intentional asymmetry, overlapping 3D textures, and aggressive typographic scales to break the grid.

We move beyond the "template" look by treating the screen as a physical canvas for tactile objects rather than a flat digital plane. This is achieved through a radical high-contrast palette, hyper-rounded containers, and a mix of distorted analog elements (barcodes, heavy inks) and futuristic gloss.

## 2. Colors
The color strategy relies on a tension between a warm, archival base (`#ffffd3`) and a hyper-synthetic bubble-gum pop (`#b61c93`).

*   **Primary (`primary` / `#b61c93`):** Use for high-impact brand moments. This is the "Pink Sugar" core. Use it for key CTAs and expressive accents.
*   **The Foundation:** `surface` (`#ffffd3`) provides a cream, off-white background that prevents the high-contrast black from feeling too digital or cold.
*   **The "No-Line" Rule:** We do not use 1px solid borders to section content. Boundaries are defined exclusively by shifting between `surface-container-low` (`#fcfaed`) and `surface-container-high` (`#f1eee0`). If a section ends, the background color must change to signal the transition.
*   **Surface Hierarchy & Nesting:** Depth is created by nesting layers. A `surface-container-lowest` (`#ffffff`) card should sit on a `surface-container-low` background to create a "lifted" feel without needing a border.
*   **The "Glass & Gradient" Rule:** Floating elements and overlays should utilize glassmorphism (surface colors at 80% opacity with a 20px backdrop blur). Main CTAs should use a gradient from `primary` to `primary_container` (`#ff65d2`) to give them a "plastic" sheen that flat fills lack.

## 3. Typography
Our typography is a clash between "High Streetwear" and "Technical Lab."

*   **Display & Headline (Epilogue):** These levels must be set with tight letter spacing (tracking: -2% to -4%). Headlines should feel heavy and distorted. Use `display-lg` (3.5rem) to dominate the layout, often overlapping other elements to create a collage-like depth.
*   **Body & Labels (Space Grotesk):** A monospace-adjacent sans-serif that brings a technical, "barcode-ready" feel to the details. This provides the "editorial" balance to the heavy headlines.
*   **Hierarchy as Identity:** Use `label-sm` (0.6875rem) for metadata—always in all-caps—to mimic the fine print on product packaging or streetwear hangtags.

## 4. Elevation & Depth
In this system, depth is tactile and atmospheric, not structural.

*   **The Layering Principle:** Stack `surface-container` tiers to create hierarchy. A profile section might be `surface-container-high`, while the inner activity feed is `surface-container-low`.
*   **Ambient Shadows:** For "floating" 3D objects (like bubble-style accents), use extra-diffused shadows. Set blur to 40px-60px and opacity to 6% using a tinted shadow derived from `on_surface` (`#383830`). Avoid grey shadows; the shadow must feel like it's falling on a cream-colored paper.
*   **The "Ghost Border" Fallback:** If accessibility requires a stroke, use the `outline_variant` (`#bbb9ae`) at 15% opacity. High-contrast, 100% opaque borders are strictly forbidden.
*   **3D Elements:** Incorporate 3D glossy textures (as seen in the 'Pink Sugar' lettering). These should have high-specular highlights and be placed as "floating" PNGs over clean, technical typography.

## 5. Components

### Buttons
*   **Primary:** High-gloss, hyper-rounded (`rounded-full`). Background is a gradient of `primary` to `primary_container`. Text is `on_primary` (White). 
*   **Secondary:** Black background (`inverse_surface`) with white text. This creates the "Black Circle/PNG" look from the reference material.
*   **Tactile State:** On hover, buttons should "inflate"—scaling up by 4% with an increased ambient shadow.

### Chips
*   **Action Chips:** Styled like barcodes or technical stickers. Use `surface-container-highest` with `label-md` typography.
*   **Selection:** When active, they flip to `primary` with a 3D bubble "sheen" overlay.

### Input Fields
*   **Text Inputs:** No bottom border or full border. Use a `surface-container-low` fill with a `rounded-md` (1.5rem) corner. The label should be `label-sm` (all caps) sitting just above the input area.
*   **Error State:** Use `error` (`#c12048`) for the text and a subtle `error_container` wash for the background.

### Cards & Lists
*   **The No-Divider Rule:** Never use horizontal lines. Separate list items using `spacing-4` (1.4rem) of vertical white space or by alternating background tints between `surface` and `surface_container_low`.
*   **Layout:** Cards should use `rounded-xl` (3rem) and avoid shadows unless they are "floating" interactive objects.

### Signature Component: The "Stamp"
*   A bold black circle (`inverse_surface`) containing `title-sm` white text. Used for "New," "Sold Out," or specific category callouts, breaking the vertical flow of the page.

## 6. Do's and Don'ts

### Do
*   **Do** overlap typography. Let a `display-lg` header partially sit behind or in front of a 3D pink bubble element.
*   **Do** use asymmetrical layouts. Push content to the far left or right of a wide container to create tension.
*   **Do** use the spacing scale strictly to maintain a "tight" editorial feel.
*   **Do** include barcode elements (`0.5px` vertical lines of varying widths) as decorative breaks in technical sections.

### Don't
*   **Don't** use 1px solid black borders. It destroys the high-end editorial feel and makes the UI look like a wireframe.
*   **Don't** use standard "system" shadows. If it doesn't look like a soft, ambient glow, it's too heavy.
*   **Don't** center everything. Centered layouts feel "safe" and "template-like." This system thrives on edge-to-edge energy.
*   **Don't** use vibrant pink for body text. Keep `primary` for headlines, buttons, and accents to maintain readability.