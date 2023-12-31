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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCurrentUser = exports.loginUser = exports.createUser = exports.getAllUsers = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = require("../models/User");
const bad_request_err_1 = require("../utils/err/bad-request-err");
const Cart_1 = require("../models/Cart");
const not_found_err_1 = require("../utils/err/not-found-err");
const getAllUsers = (_, res, next) => {
    User_1.User.findAll({})
        .then((user) => {
        res.send(user);
    })
        .catch(next);
};
exports.getAllUsers = getAllUsers;
const createUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, lastname, email, password, isAdmin } = req.body;
    try {
        let hashPassword = yield bcryptjs_1.default.hash(password, 12);
        const user = yield User_1.User.create({
            name,
            lastname,
            isAdmin,
            email,
            password: hashPassword,
        });
        yield user.save();
        if (user) {
            yield Cart_1.Cart.create({
                UserId: user.id,
            });
            res.json({
                message: "user fulfield created",
                userId: `user id ${user.id}`,
            });
        }
        else {
            return next(new bad_request_err_1.BadRequestError("Проверьте введенные данные"));
        }
    }
    catch (error) {
        next(error);
    }
});
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
            const token = jsonwebtoken_1.default.sign({
                id: user.id,
                email: user.email,
                name: user.name,
                isAdmin: user.isAdmin,
            }, "secret-key");
            const _a = user.dataValues, { password } = _a, userData = __rest(_a, ["password"]);
            res.send(Object.assign({ token }, userData));
        }
        else {
            return next(new not_found_err_1.NotFoundError("Проверьте пароль"));
        }
    }
    else {
        return next(new not_found_err_1.NotFoundError("Проверьте введенные данные"));
    }
    return next();
});
exports.loginUser = loginUser;
const getCurrentUser = (req, res, next) => {
    const { id } = req.user;
    User_1.User.findByPk(id)
        .then((user) => {
        return res.json(user);
    })
        .catch((err) => {
        next(err);
    });
};
exports.getCurrentUser = getCurrentUser;
