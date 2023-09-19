import { RequestHandler } from "express";
import { Cart } from "../models/Cart";
import { CartItem } from "../models/Cart-item";
import { NotFoundError } from "../utils/not-found-err";
import { BadRequestError } from "../utils/bad-request-err";

export const getUserCart: RequestHandler = async (req, res, next) => {
  const { id } = req.user;
  CartItem.findAll({ where: { CartId: id } })
    .then((cart) => {
      res.send(cart);
    })
    .catch((err) => {
      console.log(err);
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
      throw new NotFoundError("Не удалось найти корзину");
    }
  } catch (err) {
    if (err instanceof Error && err.name === "ValidationError") {
      return next(new BadRequestError("Ошибка валидации"));
    }
    next(err);
  }
};

// Логика добавления товара в корзмну:
// 1. Находим текущего пользователя -> по id пользователя находим корзину (а затем у нее id);
// 2. Добавляем в cartitem товары , где мы уже имеем id пользователя и id корзины
