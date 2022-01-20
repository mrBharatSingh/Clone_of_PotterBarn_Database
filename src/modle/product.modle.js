const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  name: { type: String, require: true },
  price: { type: Number, require: true },
  img1: { type: Number, require: true },
  img2: { type: Number, require: true },
  img3: { type: Number, require: true },
  img4: { type: Number, require: true },
  img5: { type: Number, require: true },
  img6: { type: Number, require: true },
  img7: { type: Number, require: true },
  img8: { type: Number, require: true },
  img9: { type: Number, require: true },
  img10: { type: Number, require: true },
  img11: { type: Number, require: true },
  img12: { type: Number, require: true },
  img13: { type: Number, require: true },
  img14: { type: Number, require: true },
});

module.exports = mongoose.model("product", productSchema);
