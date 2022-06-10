const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const fsPromises = require("fs").promises;
const path = require("path");
let users = require("../model/users.json");
const logger = require("../config/logger");

const setUsers = (data) => (users = data);

const handleLogin = async (req, res) => {
  try {
    const { name, pwd } = req.body;
    if (!name || !pwd) {
      return res
        .status(400)
        .json({ message: "Username and password are required." });
    }
    const foundUser = users.find((p) => p.username === name);
    if (!foundUser) return res.sendStatus(401);
    const match = await bcrypt.compare(pwd, foundUser.password);
    if (match) {
      const roles = Object.values(foundUser.roles);
      const accessToken = jwt.sign(
        {
          UserInfo: {
            username: foundUser.username,
            roles,
          },
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "1d" }
      );
      const otherUsers = users.filter((p) => p.username !== foundUser.username);
      const currentUser = { ...foundUser, accessToken };
      setUsers([...otherUsers, currentUser]);
      await fsPromises.writeFile(
        path.join(__dirname, "..", "model", "users.json"),
        JSON.stringify(users)
      );
      res.cookie("jwt", accessToken, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
      });
      res.json({ accessToken });
    } else {
      res.sendStatus(401);
    }
  } catch (err) {
    logger.error(err);
  }
};

module.exports = { handleLogin };
