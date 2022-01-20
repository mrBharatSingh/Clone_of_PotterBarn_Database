const env = require("dotenv");
const app = require("./index");
const connect = require("./db/db");

const start = async () => {
  await connect();

  app.listen(process.env.PORT || 2233, () => {
    console.log("listing on port 2233");
  });
};

start();
