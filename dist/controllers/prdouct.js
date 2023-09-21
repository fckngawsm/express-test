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
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProductById = exports.deleteProductById = exports.createGoods = exports.getAllGoods = void 0;
const Product_1 = require("../models/Product");
const bad_request_err_1 = require("../utils/err/bad-request-err");
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
const deleteProductById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const product = yield Product_1.Product.findByPk(id);
    if (product) {
        yield product.destroy();
        res.json({
            message: `товар с id ${id} успешно удален`,
        });
    }
    else {
        return next(new bad_request_err_1.BadRequestError(`товара с id ${id} не существует`));
    }
    return next();
});
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
