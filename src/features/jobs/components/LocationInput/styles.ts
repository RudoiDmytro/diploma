import { colors } from '@/styles/colors';

/**
 * Co-located styles for LocationInput (plain serializable sx objects only).
 * Replaces the former Tailwind classes:
 *   wrapper  <- "relative"
 *   results  <- "absolute bg-background shadow-xl border-x border-b rounded-b-lg z-10 divide-y"
 *   noResults<- "p-3"
 *   option   <- "block w-full text-start p-2"
 */
export default {
  wrapper: {
    position: 'relative',
  },

  results: {
    position: 'absolute',
    insetInline: 0,
    backgroundColor: colors.background.default,
    boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1), 0 8px 10px -6px rgba(0,0,0,0.1)',
    borderInline: `1px solid ${colors.border.default}`,
    borderBottom: `1px solid ${colors.border.default}`,
    borderBottomLeftRadius: '0.5rem',
    borderBottomRightRadius: '0.5rem',
    zIndex: 10,
    '& > *:not(:first-of-type)': {
      borderTop: `1px solid ${colors.border.default}`,
    },
  },

  noResults: {
    padding: '0.75rem',
    color: colors.text.muted,
  },

  option: {
    display: 'block',
    width: '100%',
    textAlign: 'start',
    padding: '0.5rem',
    border: 'none',
    background: 'transparent',
    color: colors.text.primary,
    cursor: 'pointer',
    font: 'inherit',
    '&:hover': {
      backgroundColor: colors.background.muted,
    },
  },
} as const;
