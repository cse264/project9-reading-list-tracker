// The four allowed statuses. Keep this list in sync with the CHECK
// constraint in server/db/schema.sql and STATUSES in server/routes/books.js.
export const STATUSES = ['Want to Read', 'Reading', 'Finished', 'Did Not Finish'];

// TODO: Pick a color for each status so users can tell them apart at a
// glance. These names match MUI's built-in palette colors, which you can
// pass straight to a <Chip color={...} />. Change them however you like.
export const STATUS_COLORS = {
  'Want to Read': 'default',
  Reading: 'default',
  Finished: 'default',
  'Did Not Finish': 'default',
};
