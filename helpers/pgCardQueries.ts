export const getAllCardsQuery = "SELECT * FROM cards;";

export const createCardQuery =
  "INSERT INTO cards (name, description, estimate, status, due_date, labels, board_id) values ($1, $2, $3, $4, $5, $6, $7);";

export const updateCardQuery =
  "UPDATE cards SET name = $1, board_id = $2, description = $3, estimate = $4, status = $5, due_date = $6, labels = $7 WHERE id = $8;";

export const deleteCardQuery = "DELETE FROM cards WHERE id = $1;";

export const getCardQuery = "SELECT * FROM cards WHERE id = $1;";

export const getAllCardsByBoardQuery =
  "SELECT * FROM cards WHERE board_id = $1;";
