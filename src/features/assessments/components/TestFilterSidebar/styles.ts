import { colors } from '@/styles/colors';
import breakpoints from '@/styles/breakpoints';

export default {
  sidebar: {
    marginTop: '0.75rem',
    backgroundColor: colors.background.default,
    border: '1px solid',
    borderColor: colors.border.default,
    borderRadius: '0.5rem',
    height: 'fit-content',
    padding: '1rem',
    top: '5rem',
    [`@media (min-width:${breakpoints.values.md}px)`]: {
      position: 'sticky',
    },
    [`@media (min-width:${breakpoints.values.lg}px)`]: {
      width: '300px',
    },
  },
  fields: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  field: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
  },
  label: {
    fontSize: '0.875rem',
    lineHeight: '1.25rem',
    fontWeight: 500,
    color: colors.text.primary,
  },
  textField: {
    '& .MuiOutlinedInput-root': {
      backgroundColor: colors.background.default,
      borderRadius: '0.375rem',
      '& fieldset': {
        borderColor: colors.border.input,
      },
    },
    '& .MuiInputBase-input': {
      fontSize: '0.875rem',
    },
  },
  select: {
    width: '100%',
    height: '2.5rem',
    border: '1px solid',
    borderColor: colors.border.input,
    borderRadius: '0.375rem',
    appearance: 'none',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    backgroundColor: colors.background.default,
    color: colors.text.primary,
    paddingBlock: '0.5rem',
    paddingLeft: '0.75rem',
    paddingRight: '2rem',
    fontSize: '0.875rem',
    '&:disabled': {
      cursor: 'not-allowed',
      opacity: 0.5,
    },
  },
  selectWrapper: {
    position: 'relative',
    width: '100%',
  },
  selectIcon: {
    position: 'absolute',
    right: '0.75rem',
    top: '0.625rem',
    height: '1rem',
    width: '1rem',
    opacity: 0.5,
    pointerEvents: 'none',
  },
  categoryGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
    gap: '0.25rem',
    justifyContent: 'space-around',
  },
};
