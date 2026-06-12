import { colors } from '@/styles/colors';

export default {
  main: {
    maxWidth: '48rem',
    margin: 'auto',
    marginBlock: '2.5rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '2.5rem',
    paddingInline: '1rem',
  },
  header: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.25rem',
    textAlign: 'center',
  },
  title: {
    fontSize: '2.25rem',
    fontWeight: 800,
    letterSpacing: '-0.025em',
    lineHeight: 1.1,
    color: colors.text.primary,
    '@media (min-width:1024px)': {
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
    backgroundColor: colors.background.default,
  },
  cardHeading: {
    fontWeight: 600,
    color: colors.text.primary,
  },
  cardSubtext: {
    color: colors.text.muted,
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  fieldLabel: {
    color: colors.text.primary,
    fontWeight: 500,
    marginBottom: '0.5rem',
  },
  nativeSelect: {
    width: '100%',
    height: '2.5rem',
    border: `1px solid ${colors.border.input}`,
    borderRadius: '0.375rem',
    appearance: 'none',
    backgroundColor: colors.background.default,
    color: colors.text.primary,
    paddingBlock: '0.5rem',
    paddingLeft: '0.75rem',
    paddingRight: '2rem',
    fontSize: '0.875rem',
    lineHeight: '1.25rem',
    '&:focus-visible': {
      outline: `2px solid ${colors.ring}`,
      outlineOffset: '2px',
    },
  },
  selectWrap: {
    position: 'relative',
    width: '100%',
  },
  selectIcon: {
    position: 'absolute',
    right: '0.75rem',
    top: '50%',
    transform: 'translateY(-50%)',
    pointerEvents: 'none',
    opacity: 0.5,
    color: colors.text.primary,
  },
  datePickerField: {
    width: '15rem',
    '& .MuiInputBase-root': {
      color: colors.text.primary,
    },
  },
  fileButton: {
    color: colors.text.primary,
    borderColor: colors.border.input,
  },
  fileName: {
    color: colors.text.muted,
    fontSize: '0.875rem',
  },
  visuallyHiddenInput: {
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: '1px',
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: '1px',
  },
  skillsHeader: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
    alignItems: 'flex-start',
  },
  selectSkillsButton: {
    background: colors.gradients.gradient1,
    color: colors.background.default,
    fontWeight: 500,
    borderRadius: '0.5rem',
    fontSize: '0.875rem',
    textTransform: 'none',
    paddingInline: '0.75rem',
    paddingBlock: '0.375rem',
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
    borderRadius: '0.25rem',
  },
  errorAlert: {
    color: colors.destructive.main,
    padding: '1rem',
  },
  statusBox: {
    display: 'flex',
    justifyContent: 'center',
    padding: '2.5rem',
  },
  dialogTitle: {
    color: colors.text.popoverForeground,
    fontWeight: 500,
    fontSize: '1.125rem',
  },
  dialogContent: {
    backgroundColor: colors.background.popover,
  },
  dialogCheckboxes: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.75rem',
    marginTop: '1rem',
  },
  checkboxLabel: {
    color: colors.text.popoverForeground,
  },
  newSkillRow: {
    display: 'flex',
    flexDirection: 'row',
    gap: '0.5rem',
    alignItems: 'flex-end',
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
    textTransform: 'none',
  },
};
