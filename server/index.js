import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import booksRouter from './routes/books.js';

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());          // allow the React dev server to call this API
app.use(express.json());  // parse JSON request bodies into req.body

// Routes
app.use('/books', booksRouter);

// Catch-all for unknown routes
app.use((req, res) => {
  res.status(404).json({ error: `Route ${req.method} ${req.originalUrl} not found` });
});

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
