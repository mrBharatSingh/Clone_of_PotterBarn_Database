const mongoose = require("mongoose");

const cartSchema = mongoose.Schema(
  {
    product_id: { type: String, require: true },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      require: true,
    },
    image: { type: String, require: true },
    name: { type: String, require: true },
    price: { type: Number, require: true },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = mongoose.model("cart", cartSchema);
