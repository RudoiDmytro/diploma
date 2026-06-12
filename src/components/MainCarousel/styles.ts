import { colors } from '@/styles/colors';
import breakpoints from '@/styles/breakpoints';

export default {
  region: {
    position: 'relative',
    width: '100%',
  },
  viewport: {
    overflow: 'hidden',
  },
  container: {
    display: 'flex',
    marginLeft: '-1rem',
  },
  slide: {
    minWidth: 0,
    flexShrink: 0,
    flexGrow: 0,
    flexBasis: '100%',
    paddingLeft: '1rem',
    [`@media (min-width:${breakpoints.values.lg}px)`]: {
      flexBasis: '50%',
    },
  },
  navButton: {
    position: 'absolute',
    height: '2rem',
    width: '2rem',
    borderRadius: '9999px',
    top: '50%',
    transform: 'translateY(-50%)',
    border: `1px solid ${colors.border.default}`,
    backgroundColor: colors.background.default,
    color: colors.text.primary,
    '&:hover': {
      backgroundColor: colors.background.accent,
      color: colors.text.accentForeground,
    },
    '&.Mui-disabled': {
      opacity: 0.5,
    },
  },
  prevButton: {
    left: '-3rem',
  },
  nextButton: {
    right: '-3rem',
  },
  toggleRow: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: '0.5rem',
  },
  toggleButton: {
    height: '2rem',
    width: '2rem',
    borderRadius: '9999px',
    border: `1px solid ${colors.border.default}`,
    backgroundColor: colors.background.default,
    color: colors.text.primary,
    '&:hover': {
      backgroundColor: colors.background.accent,
      color: colors.text.accentForeground,
    },
  },
} as const;
