export const getAllBoardsQuery = "SELECT * FROM boards;";

export const createBoardQuery =
  "INSERT INTO boards (name, color, description) values ($1, $2, $3);";

export const updateBoardQuery =
  "UPDATE boards SET name = $1, color = $2, description = $3 WHERE id = $4;";

export const deleteBoardQuery = "DELETE FROM boards WHERE id = $1;";

export const getBoardQuery = "SELECT * FROM boards WHERE id = $1;";
