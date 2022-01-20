require("dotenv").config();

const jwt = require("jsonwebtoken");

const verifyToken = (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env.JWT_SECRET_KEY, function (err, decoded) {
      if (err) return reject(err);

      resolve(decoded);
    });
  });
};

module.exports = async (req, res, next) => {
  if (!req?.headers?.authorization)
    return res
      .status(400)
      .send({ message: "plese provide valid authrization token" });

  const bearerToken = req.headers.authorization;
  console.log(bearerToken);

  if (!bearerToken.split(" ")[0] == "Bearer")
    return res
      .status(400)
      .send({ message: "plese provide valid authrization token" });

  const token = bearerToken.split(" ")[1];

  let user;
  try {
    user = await verifyToken(token);
  } catch (error) {
    return res.status(400).send({ message: "TOKEN IS NOT VALID" });
  }

  req.user = user.user;

  console.log(req.user);

  next();
};
