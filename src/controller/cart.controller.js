const express = require("express");

const router = express.Router();

const Cart = require("../modle/cart.modle");

router.get("", async (req, res) => {
  try {
    const cart = await Cart.find().lean().exec();

    res.status(200).send(cart);
  } catch (error) {
    console.log(error);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const cart = await Cart.find({ user_id: req.params.id }).lean().exec();

    res.status(200).send(cart);
  } catch (error) {
    console.log(error);
  }
});

router.post("", async (req, res) => {
  try {
    const cart = await Cart.create(req.body);

    res.status(201).send(cart);
  } catch (error) {
    console.log(error);
  }
});

router.post(":id", async (req, res) => {
  try {
    const cart = await Cart.create({
      product_id: req.product_id,
      user_id: req.params.id,
      image: req.image,
      name: req.name,
      price: req.price,
    });

    res.status(201).send(cart);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
