export const foundUserByNameQuery = `SELECT * FROM users WHERE username = $1;`;

export const updateUserQuery =
  "INSERT INTO users (username, password) values ($1, $2);";

export const foundUserByAccessTokenQuery = `SELECT * FROM users WHERE accesstoken = $1;`;

export const updateAccessTokenQuery = `UPDATE users SET accesstoken = $1 WHERE username = $2;`;

export const updateAccessTokenQueryToNull = `UPDATE users SET accesstoken = null WHERE accesstoken = $1;`;
