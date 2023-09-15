"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUser = exports.getAllUsers = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const User_1 = require("../models/User");
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
            about: user.lastname,
            isAdmin: user.isAdmin,
        },
    }))
        .catch((err) => {
        next(err);
    });
};
exports.createUser = createUser;
