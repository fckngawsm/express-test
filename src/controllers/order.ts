import { RequestHandler } from "express";
import { Cart } from "../models/Cart";
import { CartItem } from "../models/Cart-item";
import { Order } from "../models/Order";
import { OrderItem } from "../models/Order-item";
import { BadRequestError } from "../utils/err/bad-request-err";
import { Product } from "../models/Product";

export const getAllOrders: RequestHandler = (_, res, next) => {
  Order.findAll({
    include: [
      {
        model: Product,
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

export const getOrderByUserId: RequestHandler = (req, res, next) => {
  const { id } = req.user;
  Order.findAll({
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

export const addItemToOrder: RequestHandler = async (req, res, next) => {
  const { id } = req.user;
  const { phone, address } = req.body;
  let OrderInformation;
  try {
    // корзина
    const cart = await Cart.findOne({ where: { UserId: id } });
    // товары принадлежат текущему пользователю
    if (cart) {
      const cartItem = await CartItem.findAll({
        where: { cartId: cart.dataValues.id },
      });
      // создание корзины
      const order = await Order.create({
        phone,
        address,
        UserId: id,
      });
      order.save();
      if (order) {
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
      } else {
        return next(new BadRequestError("Не удалось создать заказ"));
      }
    } else {
      return next(new BadRequestError("Не удалось найти корзину"));
    }
  } catch (error) {
    return next(error);
  }
};
