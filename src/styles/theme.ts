import { createTheme } from '@mui/material/styles';

/**
 * Single MUI theme using CSS variables + color schemes.
 *
 * IMPORTANT (a11y audit): there is exactly ONE theme. Light/dark switching is
 * driven entirely by the `.dark` class that next-themes sets on <html>
 * (`cssVariables.colorSchemeSelector: 'class'`). We do NOT create two themes
 * swapped by JS state, and we do NOT use palette.mode toggling.
 *
 * The palette values below mirror the POST-FIX HSL tokens from globals.css as
 * concrete colors so MUI can run its internal color math (contrast text,
 * channels, alpha). The runtime UI still reads the live CSS variables through
 * `@/styles/colors`, so editing globals.css remains the single source of truth.
 */

// Light theme tokens (concrete mirror of globals.css :root).
const light = {
  background: 'hsl(25, 97.15%, 98.16%)', // --background
  foreground: 'hsl(212, 0.4%, 0.6%)', // --foreground
  card: 'hsl(212, 86.8%, 91.5%)', // --card
  primary: 'hsl(212, 4%, 15%)', // --primary
  primaryForeground: 'hsl(212, 0.08%, 91.5%)', // --primary-foreground
  secondary: 'hsl(212, 0.2%, 95.75%)', // --secondary
  secondaryForeground: 'hsl(212, 1.24%, 11.5%)', // --secondary-foreground
  mutedForeground: 'hsl(212, 0.2%, 35%)', // --muted-foreground (a11y-fixed)
  destructive: 'hsl(0, 84.2%, 42%)', // --destructive (a11y-fixed)
  destructiveForeground: 'hsl(0, 0%, 98%)', // --destructive-foreground
};

// Dark theme tokens (concrete mirror of globals.css .dark).
const dark = {
  background: 'hsl(238, 9.75%, 4.24%)', // --background
  foreground: 'hsl(238, 1.5%, 97.65%)', // --foreground
  card: 'hsl(238, 70.25%, 48%)', // --card (a11y-fixed)
  primary: 'hsl(238, 15%, 75%)', // --primary
  primaryForeground: 'hsl(238, 1.5%, 5.3%)', // --primary-foreground
  secondary: 'hsl(238, 7.5%, 15.9%)', // --secondary
  secondaryForeground: 'hsl(238, 1.5%, 97.65%)', // --secondary-foreground
  mutedForeground: 'hsl(238, 1.5%, 60%)', // --muted-foreground (a11y-fixed)
  destructive: 'hsl(0, 62.8%, 30.6%)', // --destructive
  destructiveForeground: 'hsl(238, 1.5%, 97.65%)', // --destructive-foreground
};

const theme = createTheme({
  cssVariables: {
    colorSchemeSelector: 'class',
  },
  colorSchemes: {
    light: {
      palette: {
        primary: {
          main: light.primary,
          contrastText: light.primaryForeground,
        },
        secondary: {
          main: light.secondary,
          contrastText: light.secondaryForeground,
        },
        error: {
          main: light.destructive,
          contrastText: light.destructiveForeground,
        },
        background: {
          default: light.background,
          paper: light.card,
        },
        text: {
          primary: light.foreground,
          secondary: light.mutedForeground,
        },
      },
    },
    dark: {
      palette: {
        primary: {
          main: dark.primary,
          contrastText: dark.primaryForeground,
        },
        secondary: {
          main: dark.secondary,
          contrastText: dark.secondaryForeground,
        },
        error: {
          main: dark.destructive,
          contrastText: dark.destructiveForeground,
        },
        background: {
          default: dark.background,
          paper: dark.card,
        },
        text: {
          primary: dark.foreground,
          secondary: dark.mutedForeground,
        },
      },
    },
  },
  typography: {
    fontFamily: 'var(--font-inter), Inter, sans-serif',
  },
  components: {
    // Covers Buttons / IconButtons / Tabs / MenuItems etc.
    MuiButtonBase: {
      styleOverrides: {
        root: {
          '&.Mui-focusVisible': {
            outline: '2px solid hsl(var(--ring))',
            outlineOffset: '2px',
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        // Native focusable elements that are not MuiButtonBase descendants.
        'a:focus-visible, select:focus-visible, input:focus-visible, textarea:focus-visible, [tabindex]:focus-visible':
          {
            outline: '2px solid hsl(var(--ring))',
            outlineOffset: '2px',
          },
        '@media (prefers-reduced-motion: reduce)': {
          '*, *::before, *::after': {
            transitionDuration: '0.01ms !important',
            animationDuration: '0.01ms !important',
            animationIterationCount: '1 !important',
            scrollBehavior: 'auto !important',
          },
        },
      },
    },
  },
});

export default theme;
