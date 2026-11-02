import { useEffect, useState } from 'react';
import { Alert, Container, Typography } from '@mui/material';
import BookForm from './components/BookForm.jsx';
import BookTable from './components/BookTable.jsx';
import EditBookDialog from './components/EditBookDialog.jsx';
import ConfirmDeleteDialog from './components/ConfirmDeleteDialog.jsx';
import { getBooks } from './api.js';

export default function App() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // The book currently open in the edit dialog / delete confirmation (or null)
  const [bookToEdit, setBookToEdit] = useState(null);
  const [bookToDelete, setBookToDelete] = useState(null);

  async function loadBooks() {
    try {
      setLoading(true);
      setBooks(await getBooks());
      setError('');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  // Load the list once when the page first renders
  useEffect(() => {
    loadBooks();
  }, []);

  async function handleAdd(newBook) {
    // TODO: call createBook(), then make sure the table shows the new book.
    // Either reload with loadBooks() or add the returned row to `books`.
  }

  async function handleSaveEdit(id, changes) {
    // TODO: call updateBook(), update the table, close the dialog
  }

  async function handleConfirmDelete() {
    // TODO: call deleteBook(bookToDelete.id), update the table, close the dialog
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Reading List
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError('')}>
          {error}
        </Alert>
      )}

      <BookForm onSubmit={handleAdd} />

      <BookTable
        books={books}
        loading={loading}
        onEdit={setBookToEdit}
        onDelete={setBookToDelete}
      />

      <EditBookDialog
        book={bookToEdit}
        onClose={() => setBookToEdit(null)}
        onSave={handleSaveEdit}
      />

      <ConfirmDeleteDialog
        book={bookToDelete}
        onCancel={() => setBookToDelete(null)}
        onConfirm={handleConfirmDelete}
      />
    </Container>
  );
}
