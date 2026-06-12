import { colors } from '@/styles/colors';
import breakpoints from '@/styles/breakpoints';

export default {
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    width: '100%',
    gap: '1.25rem',
    [`@media (min-width:${breakpoints.values.lg}px)`]: {
      alignItems: 'flex-start',
    },
  },
  section: {
    width: '100%',
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: '1.25rem',
    padding: '2rem',
    background: colors.gradients.gradient1,
    borderRadius: '1.5rem',
    [`@media (min-width:${breakpoints.values.lg}px)`]: {
      width: 'fit-content',
    },
  },
  headerCard: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    backgroundColor: colors.background.default,
    padding: '1.25rem',
    borderRadius: '0.75rem',
    color: colors.primary.main,
  },
  logo: {
    borderRadius: '0.75rem',
  },
  title: {
    fontSize: '1.25rem',
    lineHeight: '1.75rem',
    fontWeight: 700,
  },
  companyName: {
    fontWeight: 600,
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
  descriptionCard: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    gap: '1rem',
    backgroundColor: colors.background.default,
    padding: '1.25rem',
    borderRadius: '0.375rem',
    color: colors.primary.main,
  },
  resultCard: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: '2rem',
    background: colors.gradients.gradient1,
    width: '100%',
    padding: '2rem',
    borderRadius: '1.5rem',
    [`@media (min-width:${breakpoints.values.lg}px)`]: {
      minWidth: '800px',
    },
  },
  resultRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  resultHeading: {
    fontSize: '2.25rem',
    lineHeight: 1.1,
    fontWeight: 700,
    padding: '0.25rem',
    color: colors.text.cardForeground,
    [`@media (min-width:${breakpoints.values.md}px)`]: {
      fontSize: '3rem',
    },
  },
} as const;
