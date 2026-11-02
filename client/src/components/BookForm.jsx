import { useState } from 'react';
import { Box, Button, Paper, Stack, TextField, Typography } from '@mui/material';
// You will probably need some of these as you finish the form:
// import { MenuItem, Rating } from '@mui/material';
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';
// import dayjs from 'dayjs';
// import { STATUSES } from '../constants.js';

const EMPTY_FORM = {
  title: '',
  author: '',
  status: '',
  date_added: null, // a dayjs object from the DatePicker
  rating: null,
  notes: '',
};

export default function BookForm({ onSubmit }) {
  const [form, setForm] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});

  function updateField(name, value) {
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function validate() {
    const newErrors = {};
    if (!form.title.trim()) newErrors.title = 'Title is required';
    // TODO: validate author, status, and date_added
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) return;

    // TODO: convert the form into the shape the API expects.
    // Hint: the DatePicker gives you a dayjs object, but the API wants
    // a 'YYYY-MM-DD' string -> form.date_added.format('YYYY-MM-DD')
    try {
      await onSubmit(form);
      setForm(EMPTY_FORM);
    } catch (err) {
      // onSubmit throws if the server rejects the book (for example a 400).
      // TODO: show err.message to the user, e.g. in an MUI <Alert>,
      // and keep what they typed so they can fix it.
      console.error(err);
    }
  }

  return (
    <Paper component="form" onSubmit={handleSubmit} noValidate sx={{ p: 3, mb: 4 }}>
      <Typography variant="h6" component="h2" gutterBottom>
        Add a book
      </Typography>

      <Stack spacing={2}>
        <TextField
          label="Title"
          required
          value={form.title}
          onChange={(e) => updateField('title', e.target.value)}
          error={Boolean(errors.title)}
          helperText={errors.title}
        />

        {/* TODO: Author (free text, required) */}

        {/* TODO: Status (dropdown of STATUSES, required)
            Hint: <TextField select> with a <MenuItem> for each status */}

        {/* TODO: Date Added (DatePicker, required) */}

        {/* TODO: Rating (MUI <Rating />, optional)
            Only allow a rating when status is 'Finished'. */}

        {/* TODO: Notes (multiline TextField, optional) */}

        <Box>
          <Button type="submit" variant="contained">
            Add book
          </Button>
        </Box>
      </Stack>
    </Paper>
  );
}
