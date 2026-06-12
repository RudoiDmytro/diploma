/**
 * Breakpoint values mirroring the Tailwind `screens` the current classes rely on,
 * so responsive behavior is preserved exactly after the migration.
 *
 * Usage in a co-located styles.ts file:
 *   [`@media (min-width:${breakpoints.values.md}px)`]: { display: 'flex' }
 */
const breakpoints = {
  values: {
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
    '2xl': 1536,
  },
} as const;

export default breakpoints;
