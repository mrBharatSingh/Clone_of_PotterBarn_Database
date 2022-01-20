const mongoose = require("mongoose");

module.exports = async () => {
  await mongoose.connect(
    "mongodb+srv://bharat:bharat001@cluster0.dkaqb.mongodb.net/PotteryBarn?retryWrites=true&w=majority"
  );
};
