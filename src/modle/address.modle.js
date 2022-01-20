const mongoose = require("mongoose");

const addressSchema = mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      require: true,
    },
    full_name: { type: String, require: true },
    address: { type: String, require: true },
    city: { type: String, require: true },
    zip: { type: Number, require: true },
    phone: { type: Number, require: true },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = mongoose.model("address", addressSchema);
