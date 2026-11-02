# CSE264 Project 9: Building a Full Stack Reading List Tracker

## Due: Monday, November 16, 2026 at 11:59 PM

### Add your full name and Lehigh email address to this README!

Name:

Lehigh email:

Build a full-stack web application to manage a personal reading list using [React](https://react.dev), [Express.js](https://expressjs.com), and [PostgreSQL](https://www.postgresql.org). Users can add books, track their reading status, rate books they have finished, and keep optional notes. Feel free to use the [Material UI Component Library](https://mui.com) and the [Material React Table](https://www.material-react-table.com) library. The starter code already uses both.

This project brings together the second half of the course: databases (Project 6), Express APIs (Project 7), and React components (Project 8). You will connect all three into one working application.

## Starter Code

This repo already runs. `GET /books` works and the table shows four sample books. Everything else is marked with `TODO` comments. Search the project for `TODO` to find them.

```
├── server/                    Express + PostgreSQL API (port 3001)
│   ├── index.js               app setup, middleware, mounts /books (done)
│   ├── db.js                  PostgreSQL connection pool (done)
│   ├── routes/books.js        GET done; validateBook, POST, PUT, DELETE are TODO
│   ├── db/schema.sql          books table + sample rows
│   ├── db/setup.js            creates your table (npm run db:setup)
│   ├── db/check.js            tests your database login (npm run db:check)
│   └── .env.example           copy to .env
└── client/                    React + Vite + Material UI (port 5173)
    ├── vite.config.js         forwards /books to the server
    └── src/
        ├── main.jsx           theme + date picker setup (done)
        ├── App.jsx            holds the list of books; add/edit/delete handlers are TODO
        ├── api.js             fetch calls (getBooks done, the rest TODO)
        ├── constants.js       statuses; pick a color for each
        └── components/
            ├── BookForm.jsx             add-a-book form (title field done, the rest TODO)
            ├── BookTable.jsx            Material React Table (add columns, chips, stars)
            ├── EditBookDialog.jsx       edit dialog (fields and save are TODO)
            └── ConfirmDeleteDialog.jsx  delete confirmation (TODO)
```

## Project Requirements

The application should fulfill the following User Requirements:

* Add a New Book
    * Users must be able to fill out a form to add a book.
    * Fields include: Title, Author, Status (Want to Read, Reading, Finished, Did Not Finish), Date Added, an optional Rating (1 to 5 stars), and optional Notes.
    * Status must be selected from a dropdown, Date Added must use a date picker, Rating must use a star rating input, and the rest are free text.
    * **Rating rule:** a rating may only be given when the status is Finished. Disable or hide the rating input for any other status.
* View All Books
    * Users should see a list or table of all books.
    * Each book should show all the relevant fields. Show the rating as stars, not a number.
    * The list/table must update automatically after adding, editing, or deleting a book (no page refresh).
* Update an Existing Book
    * Users must be able to update a book's status, rating, and notes.
    * Optionally allow editing the title and author.
    * If a book's status changes away from Finished, its rating must be cleared.
* Delete a Book
    * Include a delete button for each book.
    * Ask for confirmation before deleting, and show which book is about to be deleted.
* Backend
    * Build a RESTful API with these endpoints:
        * `GET /books`: return all books (provided in the starter code)
        * `POST /books`: add a book; respond 201 with the new row
        * `PUT /books/:id`: update a book; respond 200 with the updated row
        * `DELETE /books/:id`: delete a book; respond 204 (or 200 with the deleted row)
    * **Validate on the server, not just the client.** Respond 400 with a JSON error message (for example `{ "error": "Title is required" }`) when a required field is missing, the status is not one of the four allowed values, the rating is not a whole number from 1 to 5, or a rating is sent for a book that is not Finished.
    * Respond 404 when `PUT` or `DELETE` names an id that does not exist, and 500 if the database query fails.
    * Use parameterized queries (`$1`, `$2`, ...) for every SQL statement. Never build SQL by joining strings.
* Styling and UX
    * Use color (for example, colored chips) to distinguish the four statuses.
    * The form must validate all required fields and show a message next to each field that is wrong.
    * Show API errors to the user (for example, an alert) instead of failing silently.
    * Additional styling or animations for a better user experience.

## Install and Run

You must have Node.js 20 or newer. You do **not** need PostgreSQL on your computer: this project uses the class Postgres server, the same one as Project 7. You must be on Lehigh's network to reach it: the main Lehigh wireless network (not lehigh-guest), a wired connection on campus, or Lehigh's VPN. Off campus without the VPN, your connection will hang and then time out.

**1. Set up the server and your database table**

```bash
cd server
npm install
cp .env.example .env        # then fill in PGUSER and PGPASSWORD
npm run db:check            # makes sure your login and permissions work
npm run db:setup            # creates your books table with 4 sample books
```

In `.env`, `PGUSER` is your Lehigh username (the part of your email before the @) and `PGPASSWORD` is the class password posted on CourseSite. The host and database name are already filled in.

`npm run db:check` changes nothing. It should end with `PASS`. If it says `FAIL`, read the hint it prints; if the hint says to contact your instructor, send the whole output.

`npm run db:setup` creates a `books` table in your own schema (named after your username). Running it again wipes your books and starts over, which is handy if your data gets messy while testing. You can look at your table in DBeaver with the same connection you made for Project 7.

**Never EVER push your `.env` file.** It holds your password. The included `.gitignore` already keeps it (and `node_modules`) out of your repo.

**2. Start the server**

```bash
cd server
npm run dev
```

This runs the API at http://localhost:3001 with nodemon, which restarts the server every time you save a file. Open http://localhost:3001/books and you should see the four sample books as JSON.

**3. Start the client** (in a second terminal)

```bash
cd client
npm install
npm run dev
```

Open http://localhost:5173. The table should show the sample books. The client forwards every request to `/books` to the server, so both must be running.

**Suggested order:** build and test the backend first, then the frontend.

1. `server/routes/books.js`: finish `validateBook`, then POST, PUT, DELETE. Test each one with Postman, Thunder Client, or curl before touching React.
2. `client/src/api.js`: finish `createBook`, `updateBook`, `deleteBook`.
3. `BookForm.jsx` and `handleAdd` in `App.jsx`: adding books.
4. `BookTable.jsx` and `constants.js`: the remaining columns, colored status chips, and star ratings.
5. `ConfirmDeleteDialog.jsx`, then `EditBookDialog.jsx`: deleting and editing.

## Submission

Submit in two places by the due date:

1. **Classroom 50:** push your finished code to this repo. Your last push before the deadline is graded.
2. **CourseSite:** submit the link to this repo on the Project 9 assignment page.

Late work loses 2 points per day starting on the second day, and a weekend counts as one day.

## Grading

* Add Book Functionality -- 15 points -- Form works, adds to the DB, and the table refreshes
* View Book List/Table -- 15 points -- Displays all books and fields correctly from the backend, with ratings shown as stars
* Update Functionality -- 15 points -- Updates status, rating, or notes and reflects the change in the UI and DB
* Delete Functionality -- 15 points -- Books can be deleted after confirmation, and the UI and DB update
* API Design -- 15 points -- RESTful routes, correct status codes, server-side validation including the rating rule, parameterized queries, and integration with the client
* Styling and UX -- 10 points -- Statuses are visually distinguished, form validation is shown per field, and the rating input follows the status
* Overall Functionality -- 15 points -- The reading list tracker works as expected without any major bugs
* If code doesn't run/compile you can get no more than a 60. But please write comments and a README to explain what you were trying to do.

## Helpful Resources

* [React Documentation](https://react.dev/)
* [Material UI Component Library](https://mui.com/material-ui/)
* [MUI X Date Pickers](https://mui.com/x/react-date-pickers/)
* [MUI Rating component](https://mui.com/material-ui/react-rating/)
* [Material React Table](https://www.material-react-table.com/)
* [Express Routing Guide](https://expressjs.com/en/guide/routing.html)
* [node-postgres (pg) Queries](https://node-postgres.com/features/queries)

## Generative AI Disclosure

If you used any generative AI tools, list them here as the syllabus requires: the name of each tool, every prompt you gave it, and the response it gave. If you did not use any, write "None."
