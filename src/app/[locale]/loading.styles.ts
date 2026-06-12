import { colors } from '@/styles/colors';

export default {
  wrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '50vh',
    padding: '2.5rem',
  },
  spinner: {
    color: colors.primary.main,
  },
} as const;
