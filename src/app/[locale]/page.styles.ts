import { colors } from '@/styles/colors';
import breakpoints from '@/styles/breakpoints';

export default {
  main: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    maxWidth: '80rem',
    margin: 'auto',
    [`@media (max-width:${breakpoints.values.md - 1}px)`]: {
      width: '100vw',
    },
  },
  inner: {
    display: 'flex',
    flexDirection: 'column',
    paddingInline: '1.25rem',
    maxWidth: '80rem',
    marginBlock: '2.5rem',
    width: '100%',
    alignItems: 'center',
    gap: '1.25rem',
  },
  title: {
    fontSize: '2.25rem',
    fontWeight: 700,
    marginBottom: '2rem',
    color: colors.text.primary,
  },
  searchSection: {
    marginBottom: '2rem',
    width: '100%',
  },
  sectionHeading: {
    fontSize: '1.5rem',
    fontWeight: 600,
    marginBottom: '1rem',
    color: colors.text.primary,
    [`@media (max-width:${breakpoints.values['2xl'] - 1}px)`]: {
      paddingInline: '2.5rem',
    },
  },
  searchRow: {
    display: 'flex',
    [`@media (max-width:${breakpoints.values['2xl'] - 1}px)`]: {
      paddingInline: '2.5rem',
    },
  },
  searchInput: {
    width: '100%',
    paddingInline: '1rem',
    paddingBlock: '0.5rem',
    borderTopLeftRadius: '0.5rem',
    borderBottomLeftRadius: '0.5rem',
    border: `1px solid ${colors.border.input}`,
    borderRight: 'none',
    backgroundColor: colors.background.default,
    color: colors.text.primary,
    fontSize: '1rem',
    fontFamily: 'inherit',
    outline: 'none',
    '&:focus-visible': {
      outline: `2px solid ${colors.ring}`,
      outlineOffset: '-1px',
      zIndex: 1,
    },
  },
  searchButton: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    gap: '0.5rem',
    paddingInline: '0.75rem',
    paddingBlock: '0.5rem',
    background: colors.gradients.gradient1,
    color: colors.background.default,
    borderRadius: 0,
    borderTopRightRadius: '0.5rem',
    borderBottomRightRadius: '0.5rem',
    textTransform: 'none',
    whiteSpace: 'nowrap',
    '&:hover': {
      background: colors.gradients.gradient2,
    },
  },
  carouselSection: {
    marginBottom: '2rem',
    width: '100%',
    margin: 'auto',
    [`@media (max-width:${breakpoints.values['2xl'] - 1}px)`]: {
      paddingInline: '2.5rem',
    },
  },
  cardLink: {
    display: 'block',
    textDecoration: 'none',
    color: 'inherit',
  },
  visuallyHidden: {
    position: 'absolute',
    width: '1px',
    height: '1px',
    padding: 0,
    margin: '-1px',
    overflow: 'hidden',
    clip: 'rect(0 0 0 0)',
    whiteSpace: 'nowrap',
    border: 0,
  },
} as const;
