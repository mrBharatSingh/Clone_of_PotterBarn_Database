require("dotenv").config();

const jwt = require("jsonwebtoken");
const User = require("../modle/user.modle");

const newToken = (user) => {
  return jwt.sign({ user: user }, process.env.JWT_SECRET_KEY);
};

const register = async (req, res) => {
  try {
    let user = await User.findOne({ email: req.body.email }).lean().exec();

    if (user)
      return res
        .status(500)
        .send({ message: "user with that email alrady exists" });

    user = await User.create(req.body);

    const token = newToken(user);

    return res.status(201).send({ user, token });
  } catch (error) {
    return res.send({ message: error.message });
  }
};

const login = async (req, res) => {
  try {
    let user = await User.findOne({ email: req.body.email });

    if (!user)
      return res
        .status(400)
        .send({ message: "either email or password not match1" });
    // console.log(user);
    const match = user.chackPassword(req.body.password);

    if (!match) return res.status(400).send({ message: " password not match" });

    const token = newToken(user);

    return res.status(201).send({ user, token });
  } catch (error) {
    return send({ message: error.message });
  }
};

module.exports = { register, login };
