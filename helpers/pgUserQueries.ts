export const foundUserByNameQuery = (name: string) =>
  `SELECT * FROM users WHERE username = '${name}';`;

export const updateUserQuery =
  "INSERT INTO users (username, password) values ($1, $2);";

export const foundUserByAccessTokenQuery = (accessToken: string) =>
  `SELECT * FROM users WHERE accesstoken = '${accessToken}';`;

export const updateAccessTokenQuery = (accessToken: string, name: string) =>
  `UPDATE users SET accesstoken = '${accessToken}' WHERE username = '${name}';`;

export const updateAccessTokenQueryToNull = (accessToken: string) =>
  `UPDATE users SET accesstoken = null WHERE accesstoken = '${accessToken}';`;
