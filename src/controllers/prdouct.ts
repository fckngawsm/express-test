import { RequestHandler } from "express";
import { Product } from "../models/Product";

export const getAllGoods: RequestHandler = (req, res, next) => {
  Product.findAll({})
    .then((product) => {
      res.send(product);
    })
    .catch((err) => {
      next(err);
    });
};

export const createGoods: RequestHandler = (req, res, next) => {
  const { title, quantity, categories, price, imageUrl } = req.body;
  Product.create({
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
  Product.destroy({ where: { id: id } })
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
  Product.update({ title, price, categories, imageUrl }, { where: { id: id } })
    .then(() => {
      res.send({ id });
    })
    .catch((err) => {
      next(err);
    });
};
