const fsPromises = require("fs").promises;
const path = require("path");
let users = require("../model/users.json");
const logger = require("../config/logger");

const setUsers = (data) => (users = data);

const handleLogout = async (req, res) => {
  try {
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(204);
    const accessToken = cookies.jwt;
    const foundUser = users.find((p) => p.accessToken === accessToken);
    if (!foundUser) {
      res.clearCookie("jwt", {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
      });
      return res.sendStatus(204);
    }
    const otherUsers = users.filter((p) => p.username !== foundUser.username);
    const currentUser = { ...foundUser, accessToken: "" };
    setUsers([...otherUsers, currentUser]);
    await fsPromises.writeFile(
      path.join(__dirname, "..", "model", "users.json"),
      JSON.stringify(users)
    );
    res.clearCookie("jwt", {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.sendStatus(204);
  } catch (err) {
    logger.error(err);
  }
};

module.exports = { handleLogout };
