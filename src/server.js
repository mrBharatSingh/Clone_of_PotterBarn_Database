const app = require("./index");
const connect = require("./db/db");

const start = async () => {
  await connect();

  app.listen(2233, () => {
    console.log("listing on port 2233");
  });
};

start();
