# Color Scale Editor

An interactive tool for building perceptually uniform color scales using LAB color space. Create harmonious, accessible palettes for design systems with precise control over lightness distribution via bezier curves.

## Features

### Scale Generation
- **LAB Color Space** -- perceptually accurate color generation matching Figma's approach
- **Bezier Curve Control** -- drag control points to shape how lightness is distributed across each scale
- **Configurable Swatch Count** -- adjust the number of steps per scale (default 12)
- **White/Black Anchors** -- optionally include pure white and black endpoints in your scale
- **Display P3 Support** -- wide-gamut color output on supported browsers

### Color Control
- **Key Color Picker** -- choose a base color and generate a full scale from it
- **Saturation Taper** -- fade saturation from vivid to muted across light and dark ends
- **Hue Drift** -- shift hue subtly across the scale for more natural-looking ramps
- **Per-Scale Bezier** -- override the global curve with a custom bezier for individual scales

### Harmony & Relationships
- **Harmonize** -- align a scale's saturation and lightness to a base scale using five methods: Direct Match, Complementary, Analogous, Triadic, and Monochromatic
- **Color Families** -- quickly add common sentiment scales (success, warning, danger, etc.)
- **Luminance View** -- desaturate all scales to compare lightness balance at a glance

### Accessibility
- **WCAG AA Contrast** -- check contrast ratios against custom foreground/background colors
- **APCA Contrast** -- newer perceptual contrast method, especially useful for UI text
- **Surface Preview** -- switch swatch background color to simulate light and dark surfaces

### Export & Sharing
- **W3C Design Tokens (DTCG)** -- export scales as standards-compliant JSON for use in design systems and build pipelines
- **Import Tokens** -- load W3C DTCG or legacy Figma Tokens JSON to restore or share work
- **Shareable URLs** -- generate a link that encodes all settings for sharing with teammates

### UI
- **Light & Dark Theme**
- **Default & Simple View Modes**
- **Lightness-Based or Sequential Numbering** -- token names reflect LAB lightness values or use incremental numbering
- **Built-in How to Use Guide** -- resizable help panel with usage instructions

## Getting Started

### Prerequisites

- Node.js 18+

### Install & Run

```bash
npm install
npm run dev
```

### Build for Production

```bash
npm run build
npm run preview
```

## Tech Stack

- React 18 + Vite 5
- Tailwind CSS
- Radix UI Themes
- Framer Motion
- LAB color space conversion for perceptual uniformity
- Cubic bezier curves for lightness distribution control

## License

CC0 1.0 Universal
