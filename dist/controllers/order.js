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
exports.addItemToOrder = exports.getOrderByUserId = exports.getAllOrders = void 0;
const Cart_1 = require("../models/Cart");
const Cart_item_1 = require("../models/Cart-item");
const Order_1 = require("../models/Order");
const Order_item_1 = require("../models/Order-item");
const bad_request_err_1 = require("../utils/err/bad-request-err");
const Product_1 = require("../models/Product");
const getAllOrders = (_, res, next) => {
    Order_1.Order.findAll({
        include: [
            {
                model: Product_1.Product,
                required: true,
            },
        ],
    })
        .then((order) => {
        res.json({
            data: order,
        });
    })
        .catch((err) => {
        return next(err);
    });
};
exports.getAllOrders = getAllOrders;
const getOrderByUserId = (req, res, next) => {
    const { id } = req.user;
    Order_1.Order.findAll({
        where: {
            UserId: id,
        },
    })
        .then((order) => {
        res.json({
            data: order,
        });
    })
        .catch((err) => {
        next(err);
    });
};
exports.getOrderByUserId = getOrderByUserId;
const addItemToOrder = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.user;
    const { phone, address } = req.body;
    let OrderInformation;
    try {
        // корзина
        const cart = yield Cart_1.Cart.findOne({ where: { UserId: id } });
        // товары принадлежат текущему пользователю
        if (cart) {
            const cartItem = yield Cart_item_1.CartItem.findAll({
                where: { cartId: cart.dataValues.id },
            });
            // создание корзины
            const order = yield Order_1.Order.create({
                phone,
                address,
                UserId: id,
            });
            order.save();
            if (order) {
                // не нашел лучшего способа чем этот :(
                cartItem.map((item) => {
                    OrderInformation = Order_item_1.OrderItem.create({
                        ProductId: item.dataValues.ProductId,
                        OrderId: order.id,
                    });
                    return OrderInformation;
                });
                res.json({
                    message: "Заказ успешно выполнен",
                });
            }
            else {
                return next(new bad_request_err_1.BadRequestError("Не удалось создать заказ"));
            }
        }
        else {
            return next(new bad_request_err_1.BadRequestError("Не удалось найти корзину"));
        }
    }
    catch (error) {
        return next(error);
    }
});
exports.addItemToOrder = addItemToOrder;
