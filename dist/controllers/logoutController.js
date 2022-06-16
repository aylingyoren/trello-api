"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const fsPromises = fs_1.default.promises;
const path_1 = __importDefault(require("path"));
let users = require("../model/users.json");
const logger_1 = __importDefault(require("../config/logger"));
const setUsers = (data) => (users = data);
const handleLogout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const cookies = req.cookies;
        if (!(cookies === null || cookies === void 0 ? void 0 : cookies.jwt))
            return res.sendStatus(204);
        const accessToken = cookies.jwt;
        const foundUser = users.find((p) => p.accessToken === accessToken);
        if (!foundUser) {
            res.clearCookie("jwt", {
                httpOnly: true,
                maxAge: 24 * 60 * 60 * 1000,
            });
            return res.status(204).json({ message: "You are logged out." });
        }
        const otherUsers = users.filter(({ userName }) => userName !== foundUser.userName);
        const currentUser = Object.assign(Object.assign({}, foundUser), { accessToken: "" });
        setUsers([...otherUsers, currentUser]);
        yield fsPromises.writeFile(path_1.default.join(__dirname, "..", "model", "users.json"), JSON.stringify(users));
        res.clearCookie("jwt", {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000,
        });
        res.status(204).json({ message: "You are logged out." });
    }
    catch (err) {
        res.status(500).json({ message: err.message });
        logger_1.default.error(err);
    }
});
exports.default = handleLogout;
//# sourceMappingURL=logoutController.js.map