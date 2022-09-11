const express = require("express");
const router = express.Router();
const productController = require("../controllers/ProductCtrl");
// Retrieve all productss
router.get("/", productController.findAll);
// Create a new products
router.post("/", productController.create);
// Retrieve a single products with id
router.get("/:id", productController.findById);
// Update a products with id
router.put("/:id", productController.update);
// Delete a products with id
router.delete("/:id", productController.delete);
module.exports = router;
