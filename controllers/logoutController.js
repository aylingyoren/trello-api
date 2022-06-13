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
      return res.status(204).json({ message: "You are logged out." });
    }
    const otherUsers = users.filter(
      ({ userName }) => userName !== foundUser.userName
    );
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
    res.status(204).json({ message: "You are logged out." });
  } catch (err) {
    res.status(500).json({ message: err.message });
    logger.error(err);
  }
};

module.exports = { handleLogout };
