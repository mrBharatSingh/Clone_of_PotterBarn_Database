const express = require("express");

const router = express.Router();

const User = require("../modle/user.modle");

router.get("", async (req, res) => {
  try {
    const user = await User.find().lean().exec();
    res.status(200).send(user);
  } catch (error) {
    console.log(error);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const user = await User.find({ _id: req.params.id }).lean().exec();
    res.status(200).send(user);
  } catch (error) {
    console.log(error);
  }
});

router.get("/verify/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, {
      verified: "true",
    })
      .lean()
      .exec();

    return res.render("verified");
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
