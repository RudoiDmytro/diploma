import { colors } from '@/styles/colors';

/**
 * Root layout styles (plain serializable sx objects only — they cross the
 * React Server Component boundary, so no functions / theme callbacks).
 */
export default {
  // Vertical flex shell so the footer stays at the bottom even on short pages.
  shell: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    minHeight: '100svh',
    height: 'fit-content',
  },

  // Skip link: visually hidden (clipped) until it receives keyboard focus,
  // at which point it reveals as the first focusable element in the body.
  skipLink: {
    position: 'absolute',
    left: '0.5rem',
    top: '-9999px',
    zIndex: 9999,
    padding: '0.75rem 1rem',
    borderRadius: '0.375rem',
    backgroundColor: colors.background.default,
    color: colors.text.primary,
    border: `1px solid ${colors.border.default}`,
    textDecoration: 'none',
    fontWeight: 600,
    width: '1px',
    height: '1px',
    overflow: 'hidden',
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    whiteSpace: 'nowrap',
    '&:focus-visible': {
      top: '0.5rem',
      width: 'auto',
      height: 'auto',
      overflow: 'visible',
      clip: 'auto',
      clipPath: 'none',
      whiteSpace: 'normal',
    },
  },
};
