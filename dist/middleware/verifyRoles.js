"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const verifyRoles = (...allowedRoles) => {
    return (req, res, next) => {
        if (!(req === null || req === void 0 ? void 0 : req.roles)) {
            return res.status(401).json({});
        }
        const rolesArray = [...allowedRoles];
        const result = req.roles
            .map((role) => rolesArray.includes(role))
            .find((val) => val === true);
        if (!result) {
            res.status(401).json({});
        }
        next();
    };
};
exports.default = verifyRoles;
//# sourceMappingURL=verifyRoles.js.map