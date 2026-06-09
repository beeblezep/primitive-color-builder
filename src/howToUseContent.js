// Structured help content for the HelpPanel component
export const helpSections = [
  {
    id: 'how-a-scale-is-built',
    title: 'How a scale is built',
    items: [
      {
        id: 'key-color-and-swatches',
        title: 'Key color & swatches',
        content: 'You pick one "key color" (e.g., blue). The editor generates 12 swatches from that color — ranging from nearly white at the top to nearly black at the bottom. Your key color sits somewhere in the middle.'
      },
      {
        id: 'bezier-curve',
        title: 'Bezier curve (lightness distribution)',
        content: 'The distribution isn\'t evenly spaced — it follows a Bezier curve that controls how lightness is spread across the steps. You can drag this curve to bunch more steps toward the light end or dark end.\n\nThink of it like a dimmer switch with a custom feel: you control how quickly or slowly the color gets darker.'
      },
      {
        id: 'lightness-caps',
        title: 'Lightness caps',
        content: 'The total lightness is capped at 98 at the light end and 5 at the dark end to avoid an awkward jump between the last two swatches.'
      }
    ]
  },
  {
    id: 'how-to-use',
    title: 'How to use',
    items: [
      {
        id: 'start-with-gray',
        title: 'Start with a neutral',
        content: 'Add a gray scale first — this anchors your palette and gives you a reference point for everything else.'
      },
      {
        id: 'add-primary-color',
        title: 'Add your brand or primary color',
        content: 'When you add a second scale and edit its key color, it automatically inherits the same lightness values as the corresponding swatches in your other scales. This keeps things harmonious from the start without any extra steps.'
      },
      {
        id: 'add-more-colors',
        title: 'Add more colors',
        content: 'Use **Add color families** to choose from common sentiments (success, warning, danger, etc.), or add another color scale and dial in a custom color.'
      },
      {
        id: 'adjust-to-taste',
        title: 'Adjust to taste',
        content: 'Once your scales are in place, you can drag the Bezier curve per scale to fine-tune how lightness is distributed — or use [Harmonize](#harmonize) to align a scale\'s energy more closely to another.'
      }
    ]
  },
  {
    id: 'advanced',
    title: 'Advanced',
    items: [
      {
        id: 'saturation-and-hue',
        title: 'Saturation taper & hue drift',
        content: 'Beyond the basics, two additional properties can shift across a scale:\n\n- **Saturation taper** — your color can be vivid in the light tones and muted in the darks (or the reverse), rather than holding a flat saturation throughout. Reds, oranges, and cyans are most affected since they have the widest saturation range. Yellows and greens need a lighter touch — too much taper in the darks can make them look muddy or olive. To adjust the saturation range go to **Advanced > Saturation range** for that scale. \n- **Hue drift** — a blue can lean slightly purple in the darks and slightly teal in the lights, adding depth and naturalness to the ramp. Yellow is particularly sensitive to hue drift — if your darks are turning ugly, try adjusting the hue drift range on that scale by going to **Advanced > Hue shift** and modifying the values in that scale to keep it warm without going dull.'
      },
      {
        id: 'harmonize',
        title: 'How Harmonize works',
        content: '**The core idea:** You have two color scales — a "base" (the one you\'re harmonizing *with*) and a "target" (the one being changed). Harmonize keeps the target\'s **hue** (its color identity — blue stays blue, red stays red) but adjusts its **saturation** (how vivid it is) and **lightness** (how bright/dark it is) to relate to the base color. It\'s like saying "make this blue *feel like* it belongs next to that green."\n\n**The five methods and what they do:**\n\n**Direct Match** — Copies the base color\'s exact saturation and lightness onto the target. If your base green is 70% vivid and 50% bright, your target blue becomes 70% vivid and 50% bright too. Result: colors that feel like they\'re from the same paint set.\n\n**Complementary** — Copies saturation but *flips* lightness (1 - lightness). If the base is dark (30% light), the target becomes light (70% light). This creates contrast — like pairing a dark navy with a pale gold. Good for colors that need to "pop" against each other.\n\n**Analogous** — Slightly *reduces* saturation (90% of base) and nudges lightness *up* by 10%. This makes the target a softer, gentler neighbor to the base — like colors that sit next to each other on a color wheel. Subtle, harmonious, low contrast.\n\n**Triadic** — *Boosts* saturation by 20% (capped at 100%) and matches lightness exactly. This makes the target more vivid and punchy. In color theory, triadic colors are evenly spaced around the wheel and tend to be vibrant — this method leans into that energy.\n\n**Monochromatic** — Matches saturation but makes the target *darker* by 20% (with a floor so it doesn\'t go pitch black). Think of it as creating depth — like a shadow version of the base color\'s intensity.\n\n**In short:** The hue never changes (blue stays blue). Each method is just a different recipe for borrowing the base color\'s saturation and lightness — directly, inverted, softened, boosted, or darkened — to create a specific visual relationship between the two colors.'
      }
    ]
  },
  {
    id: 'tips',
    title: 'Tips & Tricks',
    items: [
      {
        id: 'handling-gray',
        title: 'Handling pure black and white swatches',
        content: '**Option 1: Include pure white & black as part of your neutral scale**\nSelect the **W/B** checkbox to add pure white and black to the ends of your neutral scale. This is useful when using a semantic naming system like *neutral-100*. It\'s recommended to use sequential numbering with this method since the lightness token numbers are capped at 98 and 10.\n\n**Option 2: Single swatches**\nAlternatively, you can use a single swatch for each black and white.'
      },
      {
        id: 'luminance-check',
        title: 'Checking for visual harmony',
        content: 'Use **Luminance** view to compare lightness balance across all scales at once. The closer the luminance values are across corresponding steps, the more cohesive the palette feels. If a scale looks off, try **Harmonize** to bring it in line.'
      },
      {
        id: 'text-contrast',
        title: 'Text contrast',
        content: 'The contrast checker includes the newer **APCA** method for more perceptually accurate results — especially useful for UI text. Switch the swatch background color to simulate how your palette will look on different surfaces.'
      },
      {
        id: 'surface-check',
        title: 'Surface check',
        content: 'Switch the swatch background color to simulate how your palette will look on different surfaces.'
      },
      {
        id: 'numbering-system',
        title: 'Numbering system',
        content: 'The default numbering reflects lightness values — each number corresponds to the approximate LAB-translated lightness for that swatch, e.g., 98,95,90. This number automatically adjusts as you add or remove swatches to your scale. Alternatively, you can switch to sequential numbering, which is recommended when using the **W/B** option.'
      },
      {
        id: 'exporting',
        title: 'Export to JSON',
        content: 'Export your color scales to W3C Design Tokens JSON format for use in other tools and design systems.'
      },
      {
        id: 'importing',
        title: 'Import from JSON',
        content: 'Import from W3C Design Tokens or legacy Figma Tokens JSON to load previously saved color scales or to restore your work across sessions.'
      },
      {
        id: 'sharing',
        title: 'Share with team',
        content: 'Share your color scales with team members by copying the shareable link, which preserves all your settings and customizations.'
      }
    ]
  }
];
