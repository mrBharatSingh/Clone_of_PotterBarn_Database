const express = require("express");
const Product = require("../modle/product.modle");

const router = express.Router();

router.get("", async (req, res) => {
  try {
    const product = await Product.find().lean().exec();
    res.status(200).send(product);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
