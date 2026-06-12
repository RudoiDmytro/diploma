import { colors } from '@/styles/colors';

export default {
  triggerRow: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: '0.5rem',
    marginBlock: '0.5rem',
  },
  addButton: {
    fontWeight: 500,
    borderRadius: '0.5rem',
    fontSize: '0.875rem',
    textTransform: 'none',
  },
  dialogTitle: {
    fontWeight: 500,
    fontSize: '1.125rem',
    color: colors.text.primary,
  },
  dialogTitleCentered: {
    fontWeight: 500,
    fontSize: '1.125rem',
    color: colors.text.primary,
    textAlign: 'center',
  },
  firstDialogContent: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    marginTop: '1rem',
  },
  questionBlock: {
    display: 'flex',
    flexDirection: 'column',
    marginBlock: '0.75rem',
  },
  questionHeaderRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '0.5rem',
    gap: '1rem',
  },
  questionLabel: {
    fontWeight: 700,
    fontSize: '1.125rem',
    color: colors.text.primary,
  },
  fieldGrid: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
    marginBlock: '0.5rem',
  },
  answersHeaderRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  answersHeaderLabel: {
    fontWeight: 600,
    color: colors.text.primary,
  },
  answerRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '1.25rem',
    width: '100%',
    paddingInline: '1rem',
    border: `1px solid ${colors.border.default}`,
    background: colors.gradients.gradient1,
    borderRadius: '0.25rem',
    marginTop: '0.25rem',
  },
  ponderationBlock: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
    textAlign: 'start',
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
  fileButton: {
    color: colors.text.primary,
    borderColor: colors.border.input,
    textTransform: 'none',
  },
  fileName: {
    color: colors.text.muted,
    fontSize: '0.875rem',
  },
  addAnswerRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: '0.5rem',
  },
  submitButton: {
    textTransform: 'none',
    marginTop: '1rem',
  },
};
