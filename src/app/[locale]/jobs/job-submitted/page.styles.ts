import breakpoints from '@/styles/breakpoints';

export default {
  main: {
    marginInline: 'auto',
    marginBlock: '2.5rem',
    maxWidth: '64rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '1.25rem',
    paddingInline: '0.75rem',
    textAlign: 'center',
  },

  title: {
    fontSize: '2.25rem',
    lineHeight: 1.1,
    fontWeight: 800,
    letterSpacing: '-0.025em',
    [`@media (min-width:${breakpoints.values.lg}px)`]: {
      fontSize: '3rem',
    },
  },
};
