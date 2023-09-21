import e, { RequestHandler } from "express";
import { Product } from "../models/Product";
import { BadRequestError } from "../utils/err/bad-request-err";
// import { BadRequestError } from "../utils/bad-request-err";

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
      return next(err);
    });
};

export const deleteProductById: RequestHandler = async (req, res, next) => {
  const { id } = req.params;
  const product = await Product.findByPk(id);
  if (product) {
    await product.destroy();
    res.json({
      message: `товар с id ${id} успешно удален`,
    });
  } else {
    return next(new BadRequestError(`товара с id ${id} не существует`));
  }
  return next();
};

export const updateProductById: RequestHandler = (req, res, next) => {
  const { id } = req.params;
  const { title, price, categories, imageUrl } = req.body;
  Product.update({ title, price, categories, imageUrl }, { where: { id: id } })
    .then((product) => {
      res.send(product);
    })
    .catch((err) => {
      return next(err);
    });
};
