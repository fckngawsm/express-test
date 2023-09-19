const { celebrate, Joi } = require("celebrate");

// product
export const celebrateCreateProduct = celebrate({
  body: Joi.object().keys({
    title: Joi.string().min(2).max(30).required(),
    quantity: Joi.number().integer().min(1).max(40),
    categories: Joi.string().valid(
      "книги",
      "товары для дома",
      "запчасти для машины",
      "другое"
    ),
    price: Joi.number().integer(),
    imageUrl: Joi.string()
      .pattern(
        /^(http|https):\/\/(www\.)?([A-Za-z0-9\.\-]+)(((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/i
      )
      .required(),
  }),
});

export const celebrateUpdateProduct = celebrate({
  body: Joi.object().keys({
    title: Joi.string().min(2).max(30).required(),
    //   quantity: Joi.number().integer().min(1).max(40),
    categories: Joi.string().valid(
      "книги",
      "товары для дома",
      "запчасти для машины",
      "другое"
    ),
    price: Joi.number().integer(),
    imageUrl: Joi.string()
      .pattern(
        /^(http|https):\/\/(www\.)?([A-Za-z0-9\.\-]+)(((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/i
      )
      .required(),
  }),
});

// 