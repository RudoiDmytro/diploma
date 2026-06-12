/**
 * Styles for the "Post a new job" page <main> landmark.
 * Replaces the former Tailwind classes on the page wrapper:
 *   "max-w-3xl m-auto my-10 space-y-10"
 */
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
} as const;
