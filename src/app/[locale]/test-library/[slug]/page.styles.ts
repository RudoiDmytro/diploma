import breakpoints from '@/styles/breakpoints';

export default {
  main: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    maxWidth: '80rem',
    [`@media (max-width:${breakpoints.values.lg - 1}px)`]: {
      width: '100vw',
    },
  },
  layout: {
    display: 'flex',
    flexDirection: 'column',
    paddingInline: '1rem',
    maxWidth: '80rem',
    marginBlock: '2.5rem',
    width: '100%',
    alignItems: 'center',
    gap: '1.25rem',
    [`@media (min-width:${breakpoints.values.lg}px)`]: {
      flexDirection: 'row',
      alignItems: 'flex-start',
    },
  },
  aside: {
    display: 'flex',
    width: 'fit-content',
    flexDirection: 'column',
    gap: '1.25rem',
    position: 'sticky',
    top: '5rem',
  },
  takeButton: {
    width: '100%',
    textTransform: 'none',
    [`@media (min-width:${breakpoints.values.lg}px)`]: {
      width: 'fit-content',
    },
  },
} as const;
