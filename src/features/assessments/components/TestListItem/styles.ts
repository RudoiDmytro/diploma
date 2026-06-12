import { colors } from '@/styles/colors';
import breakpoints from '@/styles/breakpoints';

export default {
  card: {
    background: colors.gradients.gradient1,
    borderRadius: '1.5rem',
    padding: '1rem',
    [`@media (min-width:${breakpoints.values.md}px)`]: {
      height: '100%',
    },
  },
  inner: {
    display: 'flex',
    backgroundColor: colors.background.default,
    borderRadius: '0.75rem',
    padding: '0.5rem',
    transition: 'background-color 500ms ease-in-out',
    '&:hover': {
      backgroundColor: colors.background.card,
    },
    [`@media (min-width:${breakpoints.values.md}px)`]: {
      height: '100%',
    },
  },
  logo: {
    borderRadius: '0.5rem',
    alignSelf: 'center',
    marginRight: '0.5rem',
    '.dark &': {
      backgroundColor: colors.text.primary,
    },
  },
  details: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: '0.75rem',
    backgroundColor: colors.background.card,
    color: colors.text.cardForeground,
    borderRadius: '0.5rem',
    padding: '0.5rem',
  },
  title: {
    fontSize: '1.25rem',
    lineHeight: '1.75rem',
    fontWeight: 500,
  },
  metaRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    color: colors.text.muted,
  },
  metaIcon: {
    flexShrink: 0,
    fontSize: '1rem',
  },
  sideColumn: {
    display: 'none',
    flexDirection: 'column',
    margin: '0.25rem',
    textAlign: 'center',
    flexShrink: 0,
    justifyContent: 'space-between',
    gap: '0.75rem',
    [`@media (min-width:${breakpoints.values.md}px)`]: {
      display: 'flex',
    },
  },
  categoryBox: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
    backgroundColor: colors.background.card,
    padding: '0.25rem',
    borderRadius: '0.5rem',
  },
  skillsBox: {
    backgroundColor: colors.background.card,
    borderRadius: '0.5rem',
  },
  skillChip: {
    backgroundColor: colors.text.cardForeground,
    color: colors.background.default,
    fontSize: '0.75rem',
    lineHeight: '1rem',
    fontWeight: 500,
    paddingInline: '0.625rem',
    paddingBlock: '0.125rem',
    borderRadius: '0.25rem',
    border: '1px solid',
    borderColor: colors.text.primary,
    margin: '0.25rem',
  },
};
