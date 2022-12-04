export const getAllCardsQuery = "SELECT * FROM card";

export const createCardQuery =
  "INSERT INTO card (name, description, estimate, status, due_date, labels, board_id) values ($1, $2, $3, $4, $5, $6, $7) RETURNING *";

export const updateCardQuery =
  "UPDATE card SET name = $1, color = $2, description = $3, estimate = $4, status = $5, due_date = $6, labels = $7 WHERE id = $8 RETURNING *";

export const deleteCardQuery = "DELETE FROM card WHERE id = $1";

export const getCardQuery = "SELECT * FROM card WHERE id = $1";

export const getAllCardsByBoardQuery = "SELECT * FROM card WHERE board_id = $1";
