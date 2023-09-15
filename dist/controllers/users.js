"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllUsers = void 0;
const User_1 = require("../models/User");
const getAllUsers = (req, res, next) => {
    User_1.User.findAll({})
        .then((user) => {
        res.send(user);
    })
        .catch(next);
};
exports.getAllUsers = getAllUsers;
