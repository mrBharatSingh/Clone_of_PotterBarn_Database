const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchem = mongoose.Schema(
  {
    name: { type: String, require: true },
    email: { type: String, require: true, unique: true },
    password: { type: String, require: true },
    role: [{ type: String, require: true }],
    verified: { type: Boolean, default: false, require: true },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

userSchem.pre("save", function (next) {
  if (!this.isModified("password")) return next();

  this.password = bcrypt.hashSync(this.password, 8);

  return next();
});

userSchem.methods.chackPassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model("user", userSchem);
