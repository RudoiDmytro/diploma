import { colors } from '@/styles/colors';
import breakpoints from '@/styles/breakpoints';

export default {
  main: {
    paddingInline: '0.75rem',
    margin: 'auto',
    maxWidth: '80rem',
    marginBlock: '2.5rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '2.5rem',
    minHeight: '100vh',
  },
  header: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    gap: '1.25rem',
    textAlign: 'center',
    paddingInline: '1rem',
    margin: 'auto',
    alignItems: 'center',
    justifyContent: 'center',
    [`@media (min-width:${breakpoints.values.md}px)`]: {
      flexDirection: 'row',
    },
  },
  heading: {
    fontSize: '2.25rem',
    lineHeight: 1.1,
    fontWeight: 800,
    letterSpacing: '-0.025em',
    [`@media (min-width:${breakpoints.values.lg}px)`]: {
      fontSize: '3rem',
    },
  },
  subtitle: {
    color: colors.text.muted,
  },
  headerAside: {
    [`@media (min-width:${breakpoints.values.md}px)`]: {
      position: 'absolute',
      right: 0,
    },
  },
  addNewButton: {
    textTransform: 'none',
    width: '10rem',
    [`@media (min-width:${breakpoints.values.md}px)`]: {
      width: 'fit-content',
    },
  },
  addNewLinkButton: {
    textTransform: 'none',
    width: '10rem',
    [`@media (min-width:${breakpoints.values.md}px)`]: {
      width: 'fit-content',
    },
  },
  popoverPaper: {
    width: 'auto',
    padding: '0.25rem',
    backgroundColor: colors.background.popover,
    color: colors.text.popoverForeground,
  },
  section: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.75rem',
    [`@media (min-width:${breakpoints.values.lg}px)`]: {
      flexDirection: 'row-reverse',
    },
  },
  drawerTriggerWrap: {
    [`@media (min-width:${breakpoints.values.lg}px)`]: {
      display: 'none',
    },
  },
  drawerTrigger: {
    textTransform: 'none',
    width: 'fit-content',
    position: 'fixed',
    right: '1.25rem',
    top: '5rem',
    zIndex: 1200,
  },
  drawerPaper: {
    backgroundColor: colors.background.default,
  },
  drawerContent: {
    padding: '1rem',
  },
  desktopSidebar: {
    display: 'none',
    [`@media (min-width:${breakpoints.values.lg}px)`]: {
      display: 'block',
    },
  },
};
