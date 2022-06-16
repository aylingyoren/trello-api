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
const logger_1 = __importDefault(require("../config/logger"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const fs_1 = __importDefault(require("fs"));
const fsPromises = fs_1.default.promises;
const path_1 = __importDefault(require("path"));
let users = require("../model/users.json");
dotenv_1.default.config();
const setUsers = (data) => (users = data);
const MAX_AGE = 24 * 60 * 60 * 1000;
const handleLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, pwd } = req.body;
        const foundUser = users.find(({ userName }) => userName === name);
        if (!foundUser) {
            return res.status(401).json({ message: "You need to sign up!" });
        }
        const match = yield bcrypt_1.default.compare(pwd, foundUser.password);
        if (match) {
            const roles = Object.values(foundUser.roles);
            const accessToken = jsonwebtoken_1.default.sign({
                userInfo: {
                    userName: foundUser.userName,
                    roles,
                },
            }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "1d" });
            const otherUsers = users.filter(({ userName }) => userName !== foundUser.userName);
            const currentUser = Object.assign(Object.assign({}, foundUser), { accessToken });
            setUsers([...otherUsers, currentUser]);
            yield fsPromises.writeFile(path_1.default.join(__dirname, "..", "model", "users.json"), JSON.stringify(users));
            res.cookie("jwt", accessToken, {
                httpOnly: true,
                maxAge: MAX_AGE,
            });
            res.json({ accessToken });
        }
        else {
            res.status(401).json({ message: "Wrong password" });
        }
    }
    catch (err) {
        res.status(500).json({ message: err.message });
        logger_1.default.error(err);
    }
});
exports.default = handleLogin;
//# sourceMappingURL=authController.js.map