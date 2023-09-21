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
exports.clearUserCart = exports.addItemToCart = exports.getUserCart = void 0;
const Cart_1 = require("../models/Cart");
const Cart_item_1 = require("../models/Cart-item");
const not_found_err_1 = require("../utils/err/not-found-err");
const Product_1 = require("../models/Product");
const getUserCart = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.user;
    Cart_item_1.CartItem.findAll({
        where: { CartId: id },
        include: [
            {
                model: Product_1.Product,
                required: true,
            },
        ],
    })
        .then((cart) => {
        res.send(cart);
    })
        .catch((err) => {
        next(err);
    });
});
exports.getUserCart = getUserCart;
const addItemToCart = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.user;
    const { ProductId } = req.body;
    try {
        const cart = yield Cart_1.Cart.findOne({ where: { UserId: id } });
        if (cart) {
            const addItem = yield Cart_item_1.CartItem.create({
                ProductId,
                CartId: cart.dataValues.id,
            });
            addItem.save();
            res.json({
                message: "Вы успешно добавили товар в корзину",
                addItem,
            });
        }
        else {
            return next(new not_found_err_1.NotFoundError("корзина не найдена"));
        }
    }
    catch (error) {
        return next("err");
    }
});
exports.addItemToCart = addItemToCart;
const clearUserCart = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.user;
    const userCart = yield Cart_1.Cart.findOne({ where: { UserId: id } });
    res.send(userCart);
    if (userCart) {
        const cartItems = yield Cart_item_1.CartItem.destroy({
            where: { cartId: userCart.id },
            truncate: false,
        });
        res.send(cartItems);
    }
    else {
        return next(new not_found_err_1.NotFoundError("Корзина для пользователя не найдена"));
    }
    return next();
});
exports.clearUserCart = clearUserCart;
