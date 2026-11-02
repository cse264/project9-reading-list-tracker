import { Router } from 'express';
import pool from '../db.js';

const router = Router();

const STATUSES = ['Want to Read', 'Reading', 'Finished', 'Did Not Finish'];

/**
 * TODO: Finish this helper. It checks a book object coming from the client
 * and returns an error message string if something is wrong, or null if
 * the book is valid.
 *
 * Rules:
 *  - title and author are required (and not just whitespace)
 *  - status must be one of STATUSES
 *  - date_added must be a valid date
 *  - rating is optional, but if present must be an integer from 1 to 5
 *  - a rating is only allowed when status is 'Finished'
 */
function validateBook(book) {
  // TODO
  return null;
}

// ---------------------------------------------------------------
// GET /books  –  return every book (done for you as an example)
// ---------------------------------------------------------------
router.get('/', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM books ORDER BY date_added DESC, id DESC'
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch books' });
  }
});

// ---------------------------------------------------------------
// POST /books  –  add a new book
// ---------------------------------------------------------------
router.post('/', async (req, res) => {
  // TODO:
  // 1. Pull title, author, status, date_added, rating, notes off req.body
  // 2. Validate with validateBook(); if invalid, respond 400 with { error }
  // 3. INSERT the book. Use parameterized queries ($1, $2, ...) – never
  //    build SQL by concatenating strings!
  //    Hint: add "RETURNING *" to get the new row back.
  // 4. Respond 201 with the new row
  // 5. Wrap the database call in try/catch and respond 500 on failure
  res.status(501).json({ error: 'POST /books not implemented yet' });
});

// ---------------------------------------------------------------
// PUT /books/:id  –  update an existing book
// ---------------------------------------------------------------
router.put('/:id', async (req, res) => {
  // TODO:
  // 1. Read the id from req.params
  // 2. Validate the body
  // 3. UPDATE ... WHERE id = $n RETURNING *
  // 4. If no row came back, respond 404
  // 5. Otherwise respond 200 with the updated row
  res.status(501).json({ error: 'PUT /books/:id not implemented yet' });
});

// ---------------------------------------------------------------
// DELETE /books/:id  –  remove a book
// ---------------------------------------------------------------
router.delete('/:id', async (req, res) => {
  // TODO:
  // 1. DELETE ... WHERE id = $1 RETURNING *
  // 2. If nothing was deleted, respond 404
  // 3. Otherwise respond 204 (no content) or 200 with the deleted row
  res.status(501).json({ error: 'DELETE /books/:id not implemented yet' });
});

export default router;
