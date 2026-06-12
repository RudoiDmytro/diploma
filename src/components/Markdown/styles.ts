import { colors } from '@/styles/colors';

export default {
  // One container that styles the HTML react-markdown renders, via descendant
  // selectors. Replaces the previous Tailwind utility classes:
  //   wrapper .space-y-3  -> vertical rhythm between block children
  //   ul .list-inside list-disc
  //   a  .text-red-500 underline  -> brand-coloured underlined links
  root: {
    color: colors.text.primary,
    '& > * + *': { marginTop: '0.75rem' },
    '& h1': {
      fontSize: '1.5rem',
      lineHeight: 1.2,
      fontWeight: 700,
      color: colors.text.primary,
    },
    '& h2': {
      fontSize: '1.25rem',
      lineHeight: 1.3,
      fontWeight: 600,
      color: colors.text.primary,
    },
    '& h3': {
      fontSize: '1.125rem',
      lineHeight: 1.4,
      fontWeight: 600,
      color: colors.text.primary,
    },
    '& p': {
      fontSize: '1rem',
      lineHeight: 1.5,
    },
    '& ul': {
      listStyleType: 'disc',
      listStylePosition: 'inside',
    },
    '& ol': {
      listStyleType: 'decimal',
      listStylePosition: 'inside',
    },
    '& li + li': { marginTop: '0.25rem' },
    '& a': {
      color: colors.primary.main,
      textDecoration: 'underline',
    },
    '& code': {
      fontFamily: 'monospace',
      fontSize: '0.875rem',
      backgroundColor: colors.background.muted,
      color: colors.text.primary,
      paddingInline: '0.25rem',
      paddingBlock: '0.125rem',
      borderRadius: '0.25rem',
    },
    '& pre': {
      backgroundColor: colors.background.muted,
      color: colors.text.primary,
      padding: '0.75rem',
      borderRadius: '0.375rem',
      overflowX: 'auto',
    },
    '& pre code': {
      backgroundColor: 'transparent',
      padding: 0,
    },
    '& blockquote': {
      borderLeft: `0.25rem solid ${colors.border.default}`,
      paddingLeft: '0.75rem',
      color: colors.text.muted,
    },
  },
};
