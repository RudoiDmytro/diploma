/**
 * Design tokens for the MUI + Emotion styling layer.
 *
 * Every value is a CSS-variable *reference* string (e.g. `hsl(var(--background))`)
 * pointing at a custom property defined in `src/app/[locale]/globals.css`.
 * Because nothing here is a concrete color, the next-themes `.dark` class
 * (which re-defines those custom properties) drives light/dark mode with zero JS.
 *
 * Token -> globals.css variable map:
 *   background.default        -> --background
 *   background.card           -> --card
 *   background.popover        -> --popover
 *   background.muted          -> --muted
 *   background.secondary      -> --secondary
 *   background.accent         -> --accent
 *   text.primary              -> --foreground
 *   text.muted                -> --muted-foreground
 *   text.cardForeground       -> --card-foreground
 *   text.popoverForeground    -> --popover-foreground
 *   text.primaryForeground    -> --primary-foreground
 *   text.secondaryForeground  -> --secondary-foreground
 *   text.accentForeground     -> --accent-foreground
 *   text.destructiveForeground-> --destructive-foreground
 *   primary.main              -> --primary
 *   secondary.main            -> --secondary
 *   accent.main               -> --accent
 *   destructive.main          -> --destructive
 *   border.default            -> --border
 *   border.input              -> --input
 *   ring                      -> --ring
 *   radius                    -> --radius
 *   gradients.gradient1       -> --gradient1
 *   gradients.gradient2       -> --gradient2
 */
export const colors = {
  background: {
    default: 'hsl(var(--background))',
    card: 'hsl(var(--card))',
    popover: 'hsl(var(--popover))',
    muted: 'hsl(var(--muted))',
    secondary: 'hsl(var(--secondary))',
    accent: 'hsl(var(--accent))',
  },
  text: {
    primary: 'hsl(var(--foreground))',
    muted: 'hsl(var(--muted-foreground))',
    cardForeground: 'hsl(var(--card-foreground))',
    popoverForeground: 'hsl(var(--popover-foreground))',
    primaryForeground: 'hsl(var(--primary-foreground))',
    secondaryForeground: 'hsl(var(--secondary-foreground))',
    accentForeground: 'hsl(var(--accent-foreground))',
    destructiveForeground: 'hsl(var(--destructive-foreground))',
  },
  primary: {
    main: 'hsl(var(--primary))',
  },
  secondary: {
    main: 'hsl(var(--secondary))',
  },
  accent: {
    main: 'hsl(var(--accent))',
  },
  destructive: {
    main: 'hsl(var(--destructive))',
  },
  border: {
    default: 'hsl(var(--border))',
    input: 'hsl(var(--input))',
  },
  ring: 'hsl(var(--ring))',
  radius: 'var(--radius)',
  gradients: {
    gradient1: 'var(--gradient1)',
    gradient2: 'var(--gradient2)',
  },
} as const;
