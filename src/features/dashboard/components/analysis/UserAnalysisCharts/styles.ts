import { colors } from '@/styles/colors';
import breakpoints from '@/styles/breakpoints';

export default {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    margin: 'auto',
    width: '100vw',
    background: colors.gradients.gradient1,
    borderRadius: '0.5rem',
    padding: '1.25rem',
    [`@media (min-width:${breakpoints.values.md}px)`]: {
      width: '100%',
    },
  },
  tabs: {
    width: '100%',
    backgroundColor: colors.background.default,
    borderTopLeftRadius: '0.375rem',
    borderTopRightRadius: '0.375rem',
    color: colors.text.primary,
    minHeight: 'auto',
    '& .MuiTabs-flexContainer': {
      justifyContent: 'center',
    },
    '& .MuiTabs-indicator': {
      backgroundColor: colors.text.primary,
    },
  },
  tab: {
    minHeight: 'auto',
    paddingTop: '0.25rem',
    paddingBottom: '0.25rem',
    paddingInline: '0.5rem',
    color: colors.text.primary,
    borderRight: '1px solid',
    borderRightColor: colors.text.primary,
    '&:last-of-type': {
      borderRight: 'none',
    },
    '&.Mui-selected': {
      color: colors.text.primary,
      backgroundColor: colors.background.card,
    },
  },
  panel: {
    width: '100%',
    height: '100%',
    minWidth: '100vw',
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: colors.background.card,
    borderBottomLeftRadius: '0.375rem',
    borderBottomRightRadius: '0.375rem',
  },
  loaderWrap: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '1.25rem',
  },
};
