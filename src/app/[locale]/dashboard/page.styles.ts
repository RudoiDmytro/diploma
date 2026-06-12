import breakpoints from '@/styles/breakpoints';

export default {
  main: {
    display: 'flex',
    flexDirection: 'row',
    margin: 'auto',
    maxWidth: '80rem',
    width: '100%',
    minHeight: '100vh',
    paddingInline: '0.75rem',
    marginTop: '2.5rem',
    marginBottom: '2.5rem',
    gap: '2.5rem',
  },
  inner: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    maxWidth: '80rem',
    [`@media (min-width:${breakpoints.values.md}px)`]: {
      width: '100%',
    },
  },
};
