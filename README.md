# Reading List Tracker

Starter code for CSE 264 Project 9 (Full Stack App 1). Replace this README with your own when you submit
(see "Submission" in the assignment).

## Project structure

```
reading-list-tracker/
├── server/                    Express + PostgreSQL API (port 3001)
│   ├── index.js               app setup, middleware, mounts /books
│   ├── db.js                  PostgreSQL connection pool
│   ├── routes/books.js        GET done; POST, PUT, DELETE are TODO
│   ├── db/schema.sql          books table + sample rows
│   ├── db/setup.js            runs schema.sql (npm run db:setup)
│   ├── db/check.js            tests your database login (npm run db:check)
│   └── .env.example           copy to .env
└── client/                    React + Vite + Material UI (port 5173)
    ├── vite.config.js         forwards /books to the server
    └── src/
        ├── main.jsx           theme + date picker setup
        ├── App.jsx            holds the list of books and the handlers
        ├── api.js             fetch calls (getBooks done, rest TODO)
        ├── constants.js       statuses and their colors
        └── components/
            ├── BookForm.jsx
            ├── BookTable.jsx
            ├── EditBookDialog.jsx
            └── ConfirmDeleteDialog.jsx
```

## Setup

You need Node.js 20 or newer. You do **not** need PostgreSQL on your computer:
this project uses the class Postgres server, the same one as Project 7.

You must be on Lehigh's network to reach it: the main Lehigh wireless network
(not lehigh-guest), a wired connection on campus, or Lehigh's VPN.

**1. Set up the server and your database table**

```bash
cd server
npm install
cp .env.example .env        # then fill in PGUSER and PGPASSWORD
npm run db:check            # makes sure your login and permissions work
npm run db:setup
```

`npm run db:check` changes nothing. It should end with `PASS`. If it says
`FAIL`, read the hint it prints; if the hint says to contact your instructor,
send the whole output.

In `.env`, `PGUSER` is your Lehigh username (the part of your email before the @)
and `PGPASSWORD` is the class password posted on CourseSite. The host and database
name are already filled in.

`npm run db:setup` creates a `books` table with four sample books in your own
schema (named after your username). Running it again wipes your books and starts
over, which is handy if your data gets messy while testing. You can look at your
table in DBeaver with the same connection you made for Project 7.

**2. Start the server**

```bash
cd server
npm run dev
```

Check it works: open http://localhost:3001/books and you should see four sample books as JSON.

**3. Start the client** (in a second terminal)

```bash
cd client
npm install
npm run dev
```

Open http://localhost:5173. The table should show the sample books.

## Where to start

Search the project for `TODO`. A good order:

1. `server/routes/books.js`: finish `validateBook`, then POST, PUT, DELETE.
   Test each with Postman, Thunder Client, or curl before touching React.
2. `client/src/api.js`: finish `createBook`, `updateBook`, `deleteBook`.
3. `client/src/components/BookForm.jsx` and `App.jsx`: adding books.
4. `BookTable.jsx`: remaining columns and colored status chips.
5. `ConfirmDeleteDialog.jsx` and `EditBookDialog.jsx`: deleting and editing.

## Generative AI disclosure

If you used any generative AI tools, list them here as the syllabus requires:
the tool(s) used, each prompt you gave, and the response you received.
If you did not use any, write "None."
