import { colors } from '@/styles/colors';

export default {
  main: {
    margin: 'auto',
    marginBlock: '2.5rem',
    maxWidth: '64rem',
    paddingInline: '0.75rem',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    gap: '1.25rem',
  },
  title: {
    fontSize: '2.25rem',
    fontWeight: 800,
    letterSpacing: '-0.025em',
    lineHeight: 1.1,
    color: colors.text.primary,
    '@media (min-width:1024px)': {
      fontSize: '3rem',
    },
  },
  text: {
    color: colors.text.primary,
  },
};
