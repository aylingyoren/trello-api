const verifyRoles = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req?.roles)
      return res
        .status(401)
        .json({ message: "Permission is given for admin only." });
    const rolesArray = [...allowedRoles];
    const result = req.roles
      .map((role) => rolesArray.includes(role))
      .find((val) => val === true);
    if (!result)
      res.status(401).json({ message: "Permission is given for admin only." });
    next();
  };
};

module.exports = verifyRoles;
