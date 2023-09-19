import { RequestHandler } from "express";
import { Cart } from "../models/Cart";
import { CartItem } from "../models/Cart-item";
import { Order } from "../models/Order";
import { OrderItem } from "../models/Order-item";

export const getAllOrders: RequestHandler = (_, res, next) => {
  // const { id } = req.user;
  Order.findAll({})
    .then((order) => {
      res.json({
        data: order,
      });
    })
    .catch((err) => {
      next(err);
    });
};

export const getOrderByUserId: RequestHandler = (req, res, next) => {
  const { id } = req.user;
  Order.findAll({ where: { UserId: id } })
    .then((order) => {
      res.json({
        data: order,
      });
    })
    .catch((err) => {
      next(err);
    });
};

export const addItemToOrder: RequestHandler = async (req, res, next) => {
  const { id } = req.user;
  const { phone, address } = req.body;
  let OrderInformation;
  try {
    // корзина
    const cart = await Cart.findOne({ where: { UserId: id } });
    // товары принадлежат текущему пользователю
    const cartItem = await CartItem.findAll({
      where: { cartId: cart?.dataValues.id },
    });
    // создание корзины
    const order = await Order.create({
      phone,
      address,
      UserId: id,
    });
    order.save();
    // не нашел лучшего способа чем этот :(
    cartItem.map((item) => {
      OrderInformation = OrderItem.create({
        ProductId: item.dataValues.ProductId,
        OrderId: order.id,
      });
      return OrderInformation;
    });
    res.json({
      message: "Заказ успешно выполнен",
    });
  } catch (error) {
    next(error);
  }
};
