import { RequestHandler } from "express";
import { Cart } from "../models/Cart";
import { CartItem } from "../models/Cart-item";
import { Order } from "../models/Order";
import { OrderItem } from "../models/Order-item";

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
    console.log(error);
  }
};
