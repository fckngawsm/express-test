import { RequestHandler } from "express";
import { Cart } from "../models/Cart";
import { CartItem } from "../models/Cart-item";
import { NotFoundError } from "../utils/err/not-found-err";
import { Product } from "../models/Product";

export const getUserCart: RequestHandler = async (req, res, next) => {
  const { id } = req.user;
  CartItem.findAll({
    where: { CartId: id },
    include: [
      {
        model: Product,
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
};

export const addItemToCart: RequestHandler = async (req, res, next) => {
  const { id } = req.user;
  const { ProductId } = req.body;
  try {
    const cart = await Cart.findOne({ where: { UserId: id } });
    if (cart) {
      const addItem = await CartItem.create({
        ProductId,
        CartId: cart.dataValues.id,
      });
      addItem.save();
      res.json({
        message: "Вы успешно добавили товар в корзину",
        addItem,
      });
    } else {
      return next(new NotFoundError("корзина не найдена"));
    }
  } catch (error) {
    return next("err");
  }
};

export const clearUserCart: RequestHandler = async (req, res, next) => {
  const { id } = req.user;
  const userCart = await Cart.findOne({ where: { UserId: id } });
  res.send(userCart);
  if (userCart) {
    const cartItems = await CartItem.destroy({
      where: { cartId: userCart.id },
      truncate: false,
    });
    res.send(cartItems);
  } else {
    return next(new NotFoundError("Корзина для пользователя не найдена"));
  }
  return next();
};
