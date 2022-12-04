export const foundUserByNameQuery = (name: string) =>
  `SELECT * FROM users WHERE userName = ${name}`;

export const updateUserQuery =
  "INSERT INTO users (userName, password) values ($1, $2) RETURNING *";

export const foundUserByAccessTokenQuery = (accessToken: string) =>
  `SELECT * FROM users WHERE accessToken = ${accessToken}`;

export const updateAccessTokenQuery = (accessToken: string) =>
  `UPDATE users SET accessToken = null WHERE accessToken = ${accessToken}`;
