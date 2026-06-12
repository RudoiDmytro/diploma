import { colors } from '@/styles/colors';
import breakpoints from '@/styles/breakpoints';

export default {
  main: {
    maxWidth: '64rem',
    margin: 'auto',
    marginBlock: '2.5rem',
    paddingInline: '0.75rem',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    gap: '1.25rem',
  },
  heading: {
    fontSize: '2.25rem',
    lineHeight: 1.1,
    fontWeight: 800,
    letterSpacing: '-0.025em',
    color: colors.text.primary,
    [`@media (min-width:${breakpoints.values.lg}px)`]: {
      fontSize: '3rem',
    },
  },
  message: {
    color: colors.text.muted,
  },
  homeButton: {
    alignSelf: 'center',
  },
} as const;
