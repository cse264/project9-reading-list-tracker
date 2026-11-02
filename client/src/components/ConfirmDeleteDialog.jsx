import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';

/**
 * Opens when `book` is not null and asks the user to confirm the delete.
 */
export default function ConfirmDeleteDialog({ book, onCancel, onConfirm }) {
  return (
    <Dialog open={Boolean(book)} onClose={onCancel}>
      <DialogTitle>Delete this book?</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {/* TODO: show which book is about to be deleted, e.g. its title */}
          This can't be undone.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel}>Cancel</Button>
        {/* TODO: wire this button up to onConfirm */}
        <Button color="error" variant="contained">
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}
