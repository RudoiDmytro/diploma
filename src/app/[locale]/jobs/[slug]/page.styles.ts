import breakpoints from '@/styles/breakpoints';

export default {
  main: {
    display: 'flex',
    flexDirection: 'column',
    paddingInline: '1rem',
    maxWidth: '80rem',
    marginInline: 'auto',
    marginBlock: '2.5rem',
    alignItems: 'center',
    gap: '1.25rem',
    [`@media (min-width:${breakpoints.values.md}px)`]: {
      flexDirection: 'row',
      alignItems: 'flex-start',
    },
  },

  applyButton: {
    width: '10rem',
    textTransform: 'none',
    [`@media (min-width:${breakpoints.values.md}px)`]: {
      width: 'fit-content',
    },
  },
};
