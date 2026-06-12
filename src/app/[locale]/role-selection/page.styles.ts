import { colors } from '@/styles/colors';

export default {
  main: {
    margin: 'auto',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '60vh',
    paddingInline: '0.75rem',
  },
  heading: {
    display: 'block',
    color: colors.text.cardForeground,
    fontSize: '1rem',
    lineHeight: '1.5rem',
    fontWeight: 700,
    marginBottom: '0.5rem',
  },
  actions: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: '0.5rem',
    width: '100%',
    maxWidth: '24rem',
  },
  roleButton: {
    width: '100%',
  },
} as const;
