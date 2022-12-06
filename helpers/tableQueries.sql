create TABLE boards(
  id SERIAL PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  color VARCHAR(50),
  description VARCHAR(150),
  created_at DATE NOT NULL DEFAULT CURRENT_DATE
);

create TABLE cards(
  id SERIAL PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  description VARCHAR(150),
  created_at DATE NOT NULL DEFAULT CURRENT_DATE,
  estimate VARCHAR(50),
  status VARCHAR(50),
  due_date DATE,
  labels TEXT[],
  board_id INTEGER NOT NULL,
  FOREIGN KEY (board_id) REFERENCES boards (id)
);

-- f.key won't work if ref doesn't exist (f.e. board 1)
-- if delete boards cascade associated cards will be deleted too

create TABLE users(
  id SERIAL PRIMARY KEY,
  username VARCHAR(50) NOT NULL,
  password VARCHAR(150) NOT NULL,
  accesstoken VARCHAR(250)
);