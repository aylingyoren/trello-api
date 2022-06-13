const fsPromises = require("fs").promises;
const path = require("path");
const bcrypt = require("bcrypt");
let users = require("../model/users.json");
const ROLES = require("../config/roles");
const logger = require("../config/logger");

const setUsers = (data) => (users = data);

const handleNewUser = async (req, res) => {
  const { name, pwd } = req.body;
  const duplicate = users.find(({ userName }) => userName === name);
  if (duplicate)
    return res.status(409).json({ message: `User ${name} already exists.` });
  try {
    const hashedPwd = await bcrypt.hash(pwd, 10);
    const newUser = {
      userName: name,
      roles: { User: ROLES.USER },
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

module.exports = { handleNewUser };
