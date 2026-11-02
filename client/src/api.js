// All calls to the Express API live in this file, so your components
// never have to think about URLs or fetch options.

const BASE_URL = '/books'; // forwarded to http://localhost:3001 by vite.config.js

// Turns a non-2xx response into a thrown Error with the server's message.
async function handleResponse(res) {
  if (!res.ok) {
    let message = `Request failed with status ${res.status}`;
    try {
      const body = await res.json();
      if (body.error) message = body.error;
    } catch {
      // response had no JSON body
    }
    throw new Error(message);
  }
  // 204 No Content has no body to parse
  return res.status === 204 ? null : res.json();
}

// GET /books  (done for you as an example)
export async function getBooks() {
  const res = await fetch(BASE_URL);
  return handleResponse(res);
}

// POST /books
export async function createBook(book) {
  // TODO: send `book` as JSON. Remember the Content-Type header!
  throw new Error('createBook not implemented yet');
}

// PUT /books/:id
export async function updateBook(id, book) {
  // TODO
  throw new Error('updateBook not implemented yet');
}

// DELETE /books/:id
export async function deleteBook(id) {
  // TODO
  throw new Error('deleteBook not implemented yet');
}
