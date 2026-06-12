import { colors } from '@/styles/colors';

/**
 * Co-located styles for NewJobForm (plain serializable sx objects only —
 * they cross the RSC boundary, so no functions / theme callbacks).
 *
 * Native <select> elements stay native and are styled here via `nativeSelect`
 * so keyboard / mobile / AT behaviour is preserved.
 */
export default {
  header: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.25rem',
    textAlign: 'center',
  },

  h1: {
    fontSize: '2.25rem',
    lineHeight: 1.1,
    fontWeight: 800,
    letterSpacing: '-0.025em',
    [`@media (min-width:1024px)`]: {
      fontSize: '3rem',
    },
  },

  subtitle: {
    color: colors.text.muted,
  },

  card: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
    border: `1px solid ${colors.border.default}`,
    borderRadius: '0.5rem',
    padding: '1rem',
  },

  sectionTitle: {
    fontWeight: 600,
  },

  sectionSubtitle: {
    color: colors.text.muted,
  },

  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },

  fieldGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
  },

  fieldLabel: {
    fontSize: '0.875rem',
    fontWeight: 500,
    color: colors.text.primary,
  },

  // Native <select> styled to match the rest of the form controls.
  nativeSelect: {
    display: 'block',
    width: '100%',
    height: '2.5rem',
    paddingInline: '0.75rem',
    borderRadius: '0.375rem',
    border: `1px solid ${colors.border.input}`,
    backgroundColor: colors.background.default,
    color: colors.text.primary,
    fontSize: '0.875rem',
    appearance: 'auto',
  },

  applyRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: '0.5rem',
  },

  orSeparator: {
    alignSelf: 'center',
    color: colors.text.muted,
  },

  locationSelected: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.25rem',
  },

  locationSelectedText: {
    fontSize: '0.875rem',
    color: colors.text.primary,
  },

  selectSkillsButton: {
    background: colors.gradients.gradient1,
    color: colors.background.default,
    fontWeight: 500,
    fontSize: '0.875rem',
    paddingInline: '0.5rem',
    paddingBlock: '0.375rem',
    borderRadius: '0.5rem',
    textTransform: 'none',
    alignSelf: 'flex-start',
    '&:hover': {
      background: colors.gradients.gradient2,
    },
  },

  skillsContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '0.5rem',
  },

  skillChip: {
    backgroundColor: colors.background.card,
    color: colors.text.primary,
    border: `1px solid ${colors.text.primary}`,
  },

  fileButton: {
    textTransform: 'none',
    alignSelf: 'flex-start',
  },

  fileName: {
    fontSize: '0.875rem',
    color: colors.text.muted,
  },

  dialogTitle: {
    fontSize: '1.125rem',
    fontWeight: 500,
    lineHeight: 1.5,
    color: colors.text.popoverForeground,
  },

  dialogList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.75rem',
    marginTop: '1rem',
  },

  newSkillRow: {
    display: 'flex',
    alignItems: 'flex-end',
    gap: '0.5rem',
    marginTop: '1rem',
  },

  addSkillButton: {
    background: colors.gradients.gradient1,
    color: colors.background.default,
    textTransform: 'none',
    '&:hover': {
      background: colors.gradients.gradient2,
    },
  },

  confirmButton: {
    background: colors.gradients.gradient1,
    color: colors.background.default,
    textTransform: 'none',
    '&:hover': {
      background: colors.gradients.gradient2,
    },
  },

  submitButton: {
    background: colors.gradients.gradient1,
    color: colors.background.default,
    textTransform: 'none',
    alignSelf: 'flex-start',
    '&:hover': {
      background: colors.gradients.gradient2,
    },
  },

  statusBox: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '2.5rem',
  },
} as const;
