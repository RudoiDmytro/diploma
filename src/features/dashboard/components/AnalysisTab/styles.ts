import { colors } from '@/styles/colors';
import breakpoints from '@/styles/breakpoints';

export default {
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.25rem',
    alignItems: 'center',
  },
  heading: {
    fontSize: '2.25rem',
    fontWeight: 800,
    letterSpacing: '-0.025em',
    color: colors.text.primary,
    [`@media (min-width:${breakpoints.values.lg}px)`]: {
      fontSize: '3rem',
    },
  },
};
