const express = require("express");

const app = express();
app.use(express.json());

const productRouthandler = require("./controller/product.controller");
const userRouthandler = require("./controller/user.controller");
const cartRouthandler = require("./controller/cart.controller");
const addressRouthandler = require("./controller/address.controller");

const { register, login } = require("./controller/signup.controller");

app.use("/products", productRouthandler);
app.use("/users", userRouthandler);
app.use("/cart", cartRouthandler);
app.use("/address", addressRouthandler);

app.post("/register", register);
app.get("/login", login);

module.exports = app;
