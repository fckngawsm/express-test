"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.celebrateLoginUser = exports.celebrateCreateUser = exports.celebrateUpdateProduct = exports.celebrateCreateProduct = void 0;
const { celebrate, Joi } = require("celebrate");
// product
exports.celebrateCreateProduct = celebrate({
    body: Joi.object().keys({
        title: Joi.string().min(2).max(30).required(),
        quantity: Joi.number().integer().min(1).max(40),
        categories: Joi.string().valid("книги", "товары для дома", "запчасти для машины", "другое"),
        price: Joi.number().integer(),
        imageUrl: Joi.string()
            .pattern(/^(http|https):\/\/(www\.)?([A-Za-z0-9\.\-]+)(((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/i)
            .required(),
    }),
});
exports.celebrateUpdateProduct = celebrate({
    body: Joi.object().keys({
        title: Joi.string().min(2).max(30).required(),
        categories: Joi.string().valid("книги", "товары для дома", "запчасти для машины", "другое"),
        price: Joi.number(),
        imageUrl: Joi.string()
            .pattern(/^(http|https):\/\/(www\.)?([A-Za-z0-9\.\-]+)(((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/i)
            .required(),
    }),
});
// user
exports.celebrateCreateUser = celebrate({
    body: Joi.object().keys({
        name: Joi.string().min(2).max(30),
        lastname: Joi.string().min(2).max(30),
        email: Joi.string().required().email(),
        password: Joi.string().required().min(8),
    }),
});
exports.celebrateLoginUser = celebrate({
    body: Joi.object().keys({
        email: Joi.string().required().email(),
        password: Joi.string().required().min(8),
    }),
});
