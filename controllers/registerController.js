const fsPromises = require("fs").promises;
const path = require("path");
const bcrypt = require("bcrypt");
let users = require("../model/users.json");
const logger = require("../config/logger");

const setUsers = (data) => (users = data);

const handleNewUser = async (req, res) => {
  const { name, pwd } = req.body;
  if (!name || !pwd)
    return res
      .status(400)
      .json({ message: "Username and password are required." });
  const duplicate = users.find((p) => p.username === name);
  if (duplicate) return res.sendStatus(409);
  try {
    const hashedPwd = await bcrypt.hash(pwd, 10);
    const newUser = {
      username: name,
      roles: { User: "user" },
      password: hashedPwd,
    };
    setUsers([...users, newUser]);
    await fsPromises.writeFile(
      path.join(__dirname, "..", "model", "users.json"),
      JSON.stringify(users)
    );
    res.status(201).json({ success: `New user ${name} created!` });
  } catch (err) {
    res.status(500).json({ message: err.message });
    logger.error(err);
  }
};

module.exports = handleNewUser;
