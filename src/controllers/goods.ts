import { RequestHandler } from "express";
import { Goods } from "../models/Goods";

export const getAllGoods: RequestHandler = (req, res, next) => {
  Goods.findAll({})
    .then((goods) => {
      res.send(goods);
    })
    .catch((err) => {
      next(err);
    });
};

export const createGoods: RequestHandler = (req, res, next) => {
  const { title, quantity, categories, price, imageUrl } = req.body;
  Goods.create({
    title,
    quantity,
    categories,
    price,
    imageUrl,
  })
    .then((item) =>
      res.send({
        data: {
          title: item.title,
          quantity: item.quantity,
          categories: item.categories,
          price: item.price,
          url: item.imageUrl,
        },
      })
    )
    .catch((err) => {
      next(err);
    });
};

export const deleteProductById: RequestHandler = (req, res, next) => {
  const { id } = req.params;
  Goods.destroy({ where: { id: id } })
    .then(() => {
      res.send(`Элtмент с id ${id} был удален`);
    })
    .catch((err) => {
      next(err);
    });
};
