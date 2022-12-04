export const getAllBoardsQuery = "SELECT * FROM board";

export const createBoardQuery =
  "INSERT INTO board (name, color, description) values ($1, $2, $3) RETURNING *";

export const updateBoardQuery =
  "UPDATE board SET name = $1, color = $2, description = $3 WHERE id = $4 RETURNING *";

export const deleteBoardQuery = "DELETE FROM board WHERE id = $1";

export const getBoardQuery = "SELECT * FROM board WHERE id = $1";
