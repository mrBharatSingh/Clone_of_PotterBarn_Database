const express = require("express");
const app = require("..");

const router = express.Router();

const Address = require("../modle/address.modle");

router.get("", async (req, res) => {
  try {
    const address = await Address.find().lean().exec();
    res.status(200).send(address);
  } catch (error) {
    console.log(error);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const address = await Address.find({ user_id: req.params.id })
      .lean()
      .exec();
    res.status(200).send(address);
  } catch (error) {
    console.log(error);
  }
});

router.post("", async (req, res) => {
  try {
    const address = await Address.create(req.body);
    res.status(201).send(address);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
