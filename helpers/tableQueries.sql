create TABLE board(
  id SERIAL PRIMARY KEY,
  name VARCHAR(50),
  color VARCHAR(50),
  description VARCHAR(150),
  created_at TIMESTAMP
);

create TABLE card(
  id SERIAL PRIMARY KEY,
  name VARCHAR(50),
  description VARCHAR(150),
  created_at TIMESTAMP,
  estimate VARCHAR(50),
  status VARCHAR(50),
  due_date DATE,
  labels TEXT[],
  board_id INTEGER,
  FOREIGN KEY (board_id) REFERENCES board (id)
);

create TABLE users(
  id SERIAL PRIMARY KEY,
  userName VARCHAR(50),
  password VARCHAR(50),
  accessToken VARCHAR(150)
);