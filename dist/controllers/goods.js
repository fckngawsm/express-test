"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProductById = exports.deleteProductById = exports.createGoods = exports.getAllGoods = void 0;
const Goods_1 = require("../models/Goods");
const getAllGoods = (req, res, next) => {
    Goods_1.Goods.findAll({})
        .then((goods) => {
        res.send(goods);
    })
        .catch((err) => {
        next(err);
    });
};
exports.getAllGoods = getAllGoods;
const createGoods = (req, res, next) => {
    const { title, quantity, categories, price, imageUrl } = req.body;
    Goods_1.Goods.create({
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
        next(err);
    });
};
exports.createGoods = createGoods;
const deleteProductById = (req, res, next) => {
    const { id } = req.params;
    Goods_1.Goods.destroy({ where: { id: id } })
        .then(() => {
        res.send({ id });
    })
        .catch((err) => {
        next(err);
    });
};
exports.deleteProductById = deleteProductById;
const updateProductById = (req, res, next) => {
    const { id } = req.params;
    console.log(id, 'id');
    const { title, price, categories, imageUrl } = req.body;
    Goods_1.Goods.update({ title, price, categories, imageUrl }, { where: { id: id } })
        .then(() => {
        res.send({ id });
    })
        .catch((err) => {
        next(err);
    });
};
exports.updateProductById = updateProductById;
