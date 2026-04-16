// Structured help content for the HelpPanel component
export const helpSections = [
  {
    id: 'understanding-settings',
    title: 'Understanding the Settings',
    items: [
      {
        id: 'lightness-perception',
        title: 'Lightness Values & Perception',
        content: 'The settings are configured to specific lightness values that reflect how we perceive color. This includes a gentle S-curve with more subtle differences at the light end and less subtle differences at the dark end, because we are more sensitive to lighter values than darker values. The total lightness is capped at 98 at the light end and 5 at the dark end to avoid an awkward jump between the last two swatches.'
      },
      {
        id: 'customizable-settings',
        title: 'Customizable Settings',
        content: 'All of these settings are customizable for your particular use case.'
      },
      {
        id: 'lab-color-space',
        title: 'LAB Color Space (L*)',
        content: 'L* represents lightness in the LAB color space, which is then translated to HEX and other color formats.'
      },
      {
        id: 'luminance-mode',
        title: 'Luminance Mode',
        content: 'Use luminance mode to visually test value consistency across different hues and scales.'
      },
      {
        id: 'custom-lightness-range',
        title: 'Custom Lightness Range',
        content: 'For certain colors, use a custom lightness range. For example, yellow works better with L*20-90.'
      },
      {
        id: 'hue-shift',
        title: 'Hue Shift',
        content: 'Use hue shift for certain colors to avoid odd transitions. For example, yellows can shift brown in the darks.'
      },
      {
        id: 'text-contrast',
        title: 'Text Contrast Checking',
        content: 'Check text contrast using standard AA or the newer APCA (recommended).'
      },
      {
        id: 'numbering-system',
        title: 'Numbering System',
        content: 'The default numbering reflects lightness values, but you can choose sequential numbering instead. Lightness numbers reflect the general LAB-translated lightness value for that swatch.'
      },
      {
        id: 'swatch-count',
        title: 'Swatch Count',
        content: 'The default swatch count is 12 which we feel covers the most use cases without feeling like too many. We started with a standard 10-step value scale but found we needed a bit more differentiation at the ends of the scale to support different surface types like containers and cards.'
      }
    ]
  },
  {
    id: 'tips',
    title: 'Tips & Tricks',
    items: [
      {
        id: 'getting-started',
        title: 'Getting Started',
        content: 'Start with gray and add a primary or brand color.'
      },
      {
        id: 'adding-harmonious-colors',
        title: 'Adding Harmonious Colors',
        content: 'Do one of the following to start adding harmonious colors to your palette:\n\n• Add another scale, edit the key color to your desired color, and click **Harmonize**\n• Or, click **Add color families**'
      },
      {
        id: 'handling-gray',
        title: 'Handling Gray',
        content: '**Option 1: Pure Black & White**\nTo include pure black and pure white, select the **W/B** checkbox, which adds these to the scale. This is useful when using a semantic naming system like *neutral-100*. It\'s recommended to use sequential numbering with this method since the lightness token numbers are capped at 98 and 10.\n\n**Option 2: Single Swatches**\nAlternatively, you can use a single swatch for each black and white.'
      },
      {
        id: 'exporting',
        title: 'Export to JSON',
        content: 'Export your color scales to JSON format for use in other tools and design systems. You can also use the Figma plugin to import directly into your design files.'
      },
      {
        id: 'importing',
        title: 'Import from JSON',
        content: 'Import from JSON to load previously saved color scales or to restore your work across sessions.'
      },
      {
        id: 'sharing',
        title: 'Share with Team',
        content: 'Share your color scales with team members by copying the shareable link, which preserves all your settings and customizations.'
      }
    ]
  }
];
