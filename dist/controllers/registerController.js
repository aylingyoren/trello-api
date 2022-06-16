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
const bcrypt_1 = __importDefault(require("bcrypt"));
let users = require("../model/users.json");
const roles_1 = __importDefault(require("../config/roles"));
const logger_1 = __importDefault(require("../config/logger"));
const setUsers = (data) => (users = data);
const handleNewUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, pwd } = req.body;
    const duplicate = users.find(({ userName }) => userName === name);
    if (duplicate)
        return res.status(409).json({ message: `User ${name} already exists.` });
    try {
        const hashedPwd = yield bcrypt_1.default.hash(pwd, 10);
        const newUser = {
            userName: name,
            roles: { User: roles_1.default.USER },
            password: hashedPwd,
        };
        setUsers([...users, newUser]);
        yield fsPromises.writeFile(path_1.default.join(__dirname, "..", "model", "users.json"), JSON.stringify(users));
        res.status(201).json({ success: `New user ${name} created!` });
    }
    catch (err) {
        res.status(500).json({ message: err.message });
        logger_1.default.error(err);
    }
});
exports.default = handleNewUser;
//# sourceMappingURL=registerController.js.map