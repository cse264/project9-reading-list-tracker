import { useEffect, useState } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
} from '@mui/material';
// import { MenuItem, Rating, TextField } from '@mui/material';
// import { STATUSES } from '../constants.js';

/**
 * Opens when `book` is not null. Lets the user change the status, rating,
 * and notes (and optionally the title and author) of an existing book.
 */
export default function EditBookDialog({ book, onClose, onSave }) {
  const [form, setForm] = useState(null);

  // Copy the selected book into local state whenever the dialog opens
  useEffect(() => {
    setForm(book ? { ...book } : null);
  }, [book]);

  function handleSave() {
    // TODO: validate, then call onSave(book.id, form)
    // Remember: if the status is no longer 'Finished', clear the rating.
  }

  return (
    <Dialog open={Boolean(book)} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Edit book</DialogTitle>
      <DialogContent>
        <Stack spacing={2} sx={{ mt: 1 }}>
          {/* TODO: Status dropdown */}
          {/* TODO: Rating */}
          {/* TODO: Notes */}
          {/* Optional: Title and Author */}
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={handleSave}>
          Save changes
        </Button>
      </DialogActions>
    </Dialog>
  );
}
