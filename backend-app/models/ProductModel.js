"use strict";

const knex = require("./../db/db_config");
const tableName = "products";

//Product object create
var Product = function (item) {
  this.name = item.name;
  this.qty = item.qty;
  this.picture = item.picture;
  this.expiredAt = item.expiredAt;

  this.created_at = new Date();
  this.updated_at = new Date();
};
Product.create = async function (newEmp, result) {
  console.log("newEmp", newEmp);
  await knex
    .insert(
      [
        {
          name: newEmp.name,
          qty: newEmp.qty,
          expiredAt: newEmp.expiredAt,
          picture: newEmp.picture,
          isActive: true,
          created_at: new Date().toISOString().slice(0, 19).replace("T", " "),
        },
      ],
      ["id"]
    )
    .into(tableName)
    .returning("id")
    .then(function (id) {
      result(null, id);
    })
    .catch((err) => {
      result(err, null);
    });
};
Product.findById = async function (id, result) {
  await knex(tableName)
    .select("*")
    .where("isActive", true)
    .where("id", id)
    .then((productsData) => {
      console.log("ee", productsData);
      result(null, productsData);
    })
    .catch((err) => {
      result(null, err);
    });
};
Product.findAll = async function (result) {
  await knex(tableName)
    .select("*")
    .where("isActive", true)
    .then((productsData) => {
      console.log("ee", productsData);
      result(null, productsData);
    })
    .catch((err) => {
      result(null, err);
    });
};
Product.update = function (id, product, result) {
  knex(tableName)
    .where("id", "=", id)
    .update({
      name: product.name,
      qty: product.qty,
      picture: product.picture,
      updated_at: new Date().toISOString().slice(0, 19).replace("T", " "),
    })
    .then(function (id) {
      result(null, id);
    })
    .catch((err) => {
      result(err, null);
    });
};
Product.delete = function (id, result) {
  knex(tableName)
    .where("id", "=", id)
    .update({
      isActive: false,
    })
    .then(function (id) {
      result(null, id);
    })
    .catch((err) => {
      result(err, null);
    });
};
module.exports = Product;
