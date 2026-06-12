import { colors } from '@/styles/colors';

export default {
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  heading: {
    fontSize: '1.5rem',
    lineHeight: 1.2,
    fontWeight: 700,
    color: colors.text.primary,
  },
  border: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: colors.border.default,
    borderRadius: colors.radius,
    padding: '0.5rem',
  },
  itemTitle: {
    fontSize: '1.125rem',
    fontWeight: 600,
    color: colors.text.primary,
  },
  itemBody: {
    color: colors.text.muted,
  },
};
