import { colors } from '@/styles/colors';

export default {
  main: {
    paddingInline: '0.75rem',
    margin: 'auto',
    maxWidth: '80rem',
    marginBlock: '2.5rem',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'row',
    gap: '2.5rem',
  },
  sidebar: {
    display: 'flex',
    flexDirection: 'column',
    position: 'fixed',
    top: '5rem',
    left: 0,
    marginLeft: '2rem',
    marginTop: '2.5rem',
  },
  navList: {
    listStyle: 'none',
    margin: 0,
    padding: 0,
    display: 'flex',
    flexDirection: 'column',
    gap: '1.25rem',
  },
  navItem: {
    margin: 0,
  },
  navButton: {
    justifyContent: 'flex-start',
    color: colors.text.primary,
    textAlign: 'left',
    width: '100%',
    paddingInline: '0.5rem',
    '&:hover': {
      backgroundColor: colors.background.accent,
      color: colors.text.accentForeground,
    },
  },
  navButtonActive: {
    color: colors.primary.main,
    fontWeight: 700,
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    maxWidth: '80rem',
  },
  pageTitle: {
    fontSize: '2.25rem',
    fontWeight: 700,
    color: colors.text.primary,
    marginBottom: '1.25rem',
  },
} as const;
