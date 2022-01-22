require("dotenv").config();

const jwt = require("jsonwebtoken");
const User = require("../modle/user.modle");
const transporter = require("../middleware/emailSender");

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

    var emailMessage = {
      from: `"PotteryBarn"<abc@gmailcom>`,
      to: req.body.email,
      subject: `Welcome to PottryBarn ${req.body.name} `,
      text: `Hi ${req.body.name}, Please confirm your email address`,
      html: `<h1>Hi ${req.body.name} Please confirm your email address</h1>
      <a href="http://127.0.0.1:2233/users/verify/${user._id}"><button >click to verify Email</button></a>
      `,
    };

    transporter.sendMail(emailMessage);

    return res.status(201).send({ user, token });
  } catch (error) {
    return res.send({ message: error.message });
  }
};

const login = async (req, res) => {
  try {
    let user = await User.findOne({ email: req.body.email });

    if (!user) return res.status(400).send({ message: "Email is not match" });
    // console.log(user);
    const match = user.chackPassword(req.body.password);

    if (!match)
      return res.status(400).send({ message: "Password is not match" });

    if (user.verified == false)
      return res.status(400).send({ message: "Please verified user email" });

    const token = newToken(user);

    return res.status(201).send({ user, token });
  } catch (error) {
    return send({ message: error.message });
  }
};

module.exports = { register, login };
