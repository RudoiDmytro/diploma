import { colors } from '@/styles/colors';

export default {
  section: {
    width: '100%',
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: '1.25rem',
  },

  header: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
  },

  logo: {
    borderRadius: '0.75rem',
    padding: '0.25rem',
    '.dark &': {
      backgroundColor: colors.text.primary,
    },
  },

  title: {
    fontSize: '1.25rem',
    lineHeight: 1.4,
    fontWeight: 700,
    color: colors.text.primary,
  },

  companyName: {
    fontWeight: 600,
    color: colors.text.primary,
  },

  companyLink: {
    color: colors.primary.main,
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
    },
  },

  meta: {
    color: colors.text.muted,
  },

  metaRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
  },

  metaIcon: {
    flexShrink: 0,
    fontSize: '1rem',
  },
};
