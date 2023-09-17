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
exports.loginUser = exports.createUser = exports.getAllUsers = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = require("../models/User");
const bad_request_err_1 = require("../utils/bad-request-err");
const getAllUsers = (_, res, next) => {
    User_1.User.findAll({})
        .then((user) => {
        res.send(user);
    })
        .catch(next);
};
exports.getAllUsers = getAllUsers;
const createUser = (req, res, next) => {
    const { name, lastname, email, password, isAdmin } = req.body;
    bcryptjs_1.default
        .hash(password, 10)
        .then((hash) => User_1.User.create({
        name,
        lastname,
        isAdmin,
        email,
        password: hash,
    }))
        .then((user) => res.send({
        data: {
            email: user.email,
            name: user.name,
            lastname: user.lastname,
            isAdmin: user.isAdmin,
        },
    }))
        .catch((err) => {
        next(err);
    });
};
exports.createUser = createUser;
const loginUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const user = yield User_1.User.findOne({
        where: {
            email: email,
        },
    });
    if (user) {
        const matched = yield bcryptjs_1.default.compare(password, user.password);
        if (matched) {
            const token = jsonwebtoken_1.default.sign({ id: user.id, email: user.email, name: user.name }, "secret-key");
            res.json({ token });
        }
        else {
            throw new bad_request_err_1.BadRequestError("Проверьте введенные данные");
        }
    }
    else {
        next();
    }
});
exports.loginUser = loginUser;
// export const getCurrentUser = (
//   req: RequestCustom,
//   res: Response,
//   next: NextFunction
// ) => {
//   const { id } = req.user;
//   User.findByPk(id).then((user) => {
//     console.log(user);
//   });
// };
