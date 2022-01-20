const express = require("express");

const router = express.Router();

const User = require("../modle/user.modle");

router.get("", async (req, res) => {
  const user = await User.find().lean().exec();

  res.status(200).send(user);
});

module.exports = router;
