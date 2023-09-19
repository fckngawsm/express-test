"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProductById = exports.deleteProductById = exports.createGoods = exports.getAllGoods = void 0;
const Product_1 = require("../models/Product");
// import { BadRequestError } from "../utils/bad-request-err";
const getAllGoods = (req, res, next) => {
    Product_1.Product.findAll({})
        .then((product) => {
        res.send(product);
    })
        .catch((err) => {
        next(err);
    });
};
exports.getAllGoods = getAllGoods;
const createGoods = (req, res, next) => {
    const { title, quantity, categories, price, imageUrl } = req.body;
    Product_1.Product.create({
        title,
        quantity,
        categories,
        price,
        imageUrl,
    })
        .then((item) => res.send({
        data: {
            title: item.title,
            quantity: item.quantity,
            categories: item.categories,
            price: item.price,
            url: item.imageUrl,
        },
    }))
        .catch((err) => {
        return next(err);
    });
};
exports.createGoods = createGoods;
const deleteProductById = (req, res, next) => {
    const { id } = req.params;
    Product_1.Product.destroy({ where: { id: id } })
        .then(() => {
        res.send({ id });
    })
        .catch((err) => {
        return next(err);
    });
};
exports.deleteProductById = deleteProductById;
const updateProductById = (req, res, next) => {
    const { id } = req.params;
    const { title, price, categories, imageUrl } = req.body;
    Product_1.Product.update({ title, price, categories, imageUrl }, { where: { id: id } })
        .then((product) => {
        res.send(product);
    })
        .catch((err) => {
        return next(err);
    });
};
exports.updateProductById = updateProductById;
