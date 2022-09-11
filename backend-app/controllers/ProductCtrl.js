"use strict";
const Product = require("../models/ProductModel");
exports.findAll = function (req, res) {
  Product.findAll(function (err, product) {
    console.log("controller");
    if (err) res.send(err);
    res.send(product);
  });
};
exports.create = function (req, res) {
  const new_prod = new Product(req.body);
  //handles null error
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    res
      .status(400)
      .send({ error: true, message: "Please provide all required field" });
  } else {
    Product.create(new_prod, function (err, product) {
      if (err) {
        process.env.NODE_ENV === "development"
          ? res.send(err)
          : res.json({
              error: true,
              message: "Something went wrong! Please contact admin",
              data: null,
            });
      } else {
        res.json({
          error: false,
          message: "Product added successfully!",
          data: product,
        });
      }
    });
  }
};
exports.findById = function (req, res) {
  Product.findById(req.params.id, function (err, product) {
    if (err) res.send(err);
    res.json(product);
  });
};
exports.update = function (req, res) {
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    res
      .status(400)
      .send({ error: true, message: "Please provide all required field" });
  } else {
    Product.update(
      req.params.id,
      new Product(req.body),
      function (err, product) {
        if (err) res.send(err);
        res.json({ error: false, message: "Product successfully updated" });
      }
    );
  }
};
exports.delete = function (req, res) {
  Product.delete(req.params.id, function (err, product) {
    if (err) res.send(err);
    res.json({ error: false, message: "Product successfully deleted" });
  });
};
