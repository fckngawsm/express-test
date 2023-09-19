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
exports.addItemToCart = exports.getUserCart = void 0;
const Cart_1 = require("../models/Cart");
const Cart_item_1 = require("../models/Cart-item");
const getUserCart = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.user;
    Cart_item_1.CartItem.findAll({ where: { CartId: id } })
        .then((cart) => {
        res.send(cart);
    })
        .catch((err) => {
        console.log(err);
    });
});
exports.getUserCart = getUserCart;
const addItemToCart = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.user;
    const { ProductId } = req.body;
    try {
        const cart = yield Cart_1.Cart.findOne({ where: { UserId: id } });
        const addItem = yield Cart_item_1.CartItem.create({
            ProductId,
            CartId: cart === null || cart === void 0 ? void 0 : cart.dataValues.id,
        });
        addItem.save();
        res.json({
            message: "Вы успешно добавили товар в корзину",
            addItem,
        });
    }
    catch (err) {
        next(err);
    }
});
exports.addItemToCart = addItemToCart;
// Логика добавления товара в корзмну:
// 1. Находим текущего пользователя -> по id пользователя находим корзину (а затем у нее id);
// 2. Добавляем в cartitem товары , где мы уже имеем id пользователя и id корзины
