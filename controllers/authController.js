const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const fsPromises = require("fs").promises;
const path = require("path");
let users = require("../model/users.json");
const logger = require("../config/logger");

const setUsers = (data) => (users = data);
const MAX_AGE = 24 * 60 * 60 * 1000;

const handleLogin = async (req, res) => {
  try {
    const { name, pwd } = req.body;
    const foundUser = users.find(({ userName }) => userName === name);
    if (!foundUser)
      return res.status(401).json({ message: "You need to sign up!" });
    const match = await bcrypt.compare(pwd, foundUser.password);
    if (match) {
      const roles = Object.values(foundUser.roles);
      const accessToken = jwt.sign(
        {
          userInfo: {
            userName: foundUser.userName,
            roles,
          },
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "1d" }
      );
      const otherUsers = users.filter(
        ({ userName }) => userName !== foundUser.userName
      );
      const currentUser = { ...foundUser, accessToken };
      setUsers([...otherUsers, currentUser]);
      await fsPromises.writeFile(
        path.join(__dirname, "..", "model", "users.json"),
        JSON.stringify(users)
      );
      res.cookie("jwt", accessToken, {
        httpOnly: true,
        maxAge: MAX_AGE,
      });
      res.json({ accessToken });
    } else {
      res.status(401).json({ message: "Wrong password" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
    logger.error(err);
  }
};

module.exports = { handleLogin };
