const express = require("express");

const app = express();
app.use(express.json());
const cors = require("cors");

app.use(cors());

const productRouthandler = require("./controller/product.controller");
const userRouthandler = require("./controller/user.controller");
const cartRouthandler = require("./controller/cart.controller");
const addressRouthandler = require("./controller/address.controller");
const docRouthandler = require("./controller/ejs.controller");

const { register, login } = require("./controller/signup.controller");
app.set("view engine", "ejs");
app.use(express.static("public"));

app.use("", docRouthandler);

app.use("/products", productRouthandler);
app.use("/users", userRouthandler);
app.use("/cart", cartRouthandler);
app.use("/address", addressRouthandler);

app.post("/register", register);
app.post("/login", login);

module.exports = app;
