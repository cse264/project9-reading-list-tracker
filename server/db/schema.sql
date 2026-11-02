-- Creates the books table and some sample data in your own schema.
-- Run it with:  npm run db:setup   (from the server folder)

DROP TABLE IF EXISTS books;

CREATE TABLE books (
  id          SERIAL PRIMARY KEY,
  title       TEXT NOT NULL,
  author      TEXT NOT NULL,
  status      TEXT NOT NULL
              CHECK (status IN ('Want to Read', 'Reading', 'Finished', 'Did Not Finish')),
  date_added  DATE NOT NULL DEFAULT CURRENT_DATE,
  rating      INTEGER CHECK (rating BETWEEN 1 AND 5),
  notes       TEXT
  -- TODO (optional): should the database itself enforce
  -- "a rating is only allowed when status is Finished"?
  -- Look up CHECK constraints that reference more than one column.
);

-- Sample rows so the table isn't empty the first time you run the app
INSERT INTO books (title, author, status, date_added, rating, notes) VALUES
  ('The Left Hand of Darkness', 'Ursula K. Le Guin',    'Finished',       '2026-09-14', 5,    'Reread the ending.'),
  ('Project Hail Mary',         'Andy Weir',            'Reading',        '2026-10-20', NULL, NULL),
  ('Braiding Sweetgrass',       'Robin Wall Kimmerer',  'Want to Read',   '2026-10-28', NULL, 'Recommended by a friend'),
  ('Infinite Jest',             'David Foster Wallace', 'Did Not Finish', '2026-08-03', NULL, 'Stopped around page 300');
