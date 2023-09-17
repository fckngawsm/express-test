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
      res.send({ id });
    })
    .catch((err) => {
      next(err);
    });
};

export const updateProductById: RequestHandler = (req, res, next) => {
  const { id } = req.params;
  const { title, price, categories, imageUrl } = req.body;
  Goods.update({ title, price, categories, imageUrl }, { where: { id: id } })
    .then(() => {
      res.send({ id });
    })
    .catch((err) => {
      next(err);
    });
};
