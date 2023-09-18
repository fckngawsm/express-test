import { RequestHandler } from "express";
import { Cart } from "../models/Cart";
import { CartItem } from "../models/Cart-item";

export const addItemToCart: RequestHandler = async (req, res, next) => {
  const { id } = req.user;
  const { ProductId } = req.body;
  try {
    const cart = await Cart.findOne({ where: { UserId: id } });
    const addItem = await CartItem.create({
      ProductId,
      CartId: cart?.dataValues.id,
    });
    console.log(cart);
    addItem.save();
    res.json({
      message: "Вы успешно добавили товар в корзину",
      addItem,
    });
  } catch (err) {
    next(err);
  }
};

// Логика добавления товара в корзмну:
// 1. Находим текущего пользователя -> по id пользователя находим корзину (а затем у нее id);
// 2. Добавляем в cartitem товары , где мы уже имеем id пользователя и id корзины
