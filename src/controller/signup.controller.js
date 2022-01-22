require("dotenv").config();

const jwt = require("jsonwebtoken");
const User = require("../modle/user.modle");
const transporter = require("../middleware/emailSender");

const newToken = (user) => {
  return jwt.sign({ user: user }, process.env.JWT_SECRET_KEY);
};

const register = async (req, res) => {
  try {
    let user = await User.findOne({ email: req.body.email }).lean().exec();

    if (user)
      return res
        .status(500)
        .send({ message: "user with that email alrady exists" });

    user = await User.create(req.body);

    const token = newToken(user);

    var emailMessage = {
      from: `"PotteryBarn"<abc@gmailcom>`,
      to: req.body.email,
      subject: `Welcome to PottryBarn ${req.body.name} `,
      text: `Hi ${req.body.name}, Please confirm your email address`,
      html: `<!DOCTYPE html>
      <html lang="en">
      
      <head>
          <meta charset="UTF-8">
          <meta http-equiv="X-UA-Compatible" content="IE=edge">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Document</title>
      
      
      
          <head>
              <style>
                  body {
                      font-family: Arial, Helvetica, sans-serif;
                  }
      
                  body {
                      background-color: rgb(246, 244, 238);
                  }
      
                  #t1 {
      
                      text-align: center;
      
                      font-size: 23px;
                      font-weight: bold;
                      color: blue;
                      margin-top: 20px;
                  }
      
                  #cont {
                      margin: auto;
                      /* border: 1px solid red; */
                      width: 100%;
      
      
                  }
      
                  #cont1 {
                      width: 93%;
                      height: 500px;
                      /* border: 1px solid black; */
                      margin: auto;
                      margin-top: 20px;
                      background-color: rgb(255, 255, 255);
                  }
      
                  #icont {
                      width: 60%;
                      /* border: 1px solid rgb(194, 56, 56); */
      
                      height: 100%;
                      margin: auto;
      
                  }
      
                  #img1 {
                      padding: auto;
                      margin: 30px 45% 5px;
      
                      width: 90px;
                      opacity: 80%;
                  }
      
                  #t2 {
                      text-align: center;
                      font-size: 23px;
                      font-weight: bold;
                      margin-top: 15px;
                  }
      
                  hr {
                      margin-top: 2px;
                  }
      
                  #t3 {
                      text-align: center;
                  }
      
                  #t4 {
      
                      color: white;
                      font-size: 20px;
                      font-weight: bold;
                      margin: auto;
                  }
      
                  #icont0 {
                      width: 350px;
                      height: 60px;
                      background-color: blue;
                      display: flex;
                      justify-content: center;
                      text-align: center;
                      border-radius: 10px;
                      margin: auto;
                      margin-left: auto;
      
                  }
              </style>
          </head>
      
      <body>
          <div id="cont">
              <p id="t1">Pottery Barn</p>
          </div>
          <div id="cont1">
              <div id="icont">
                  <img id="img1"
                      src="https://www.nidirect.gov.uk/sites/default/files/styles/nigov_full_620_x1/public/images/email_logo.jpg?itok=ifUhNgCT"
                      alt="">
                  <p id="t2">Verify your email address</p>
      
                  <hr>
                  <p id="t3">In order to start using your <b>Pottery Barn</b> account, you need to <br> confirm your email
                      address.</p>
                  <div>
                      <a href="https://potterybarn-database.herokuapp.com/users/verify/${user._id}">
                          <div id="icont0">
                              <p id="t4">Verify Email Address</p>
                          </div>
                      </a>
                  </div>
      
      
                  <br> <br>
                  <hr width="150px">
                  <br> <br>
                  <p id="t3"><i>If you did not sign up for this account you can ignore this email and the <br> account will be
                          deleted. </i></p>
              </div>
      
          </div>
      
      </body>
      
      </html>
      `,
    };

    transporter.sendMail(emailMessage);

    return res.status(201).send({ user, token });
  } catch (error) {
    return res.send({ message: error.message });
  }
};

const login = async (req, res) => {
  try {
    let user = await User.findOne({ email: req.body.email });

    if (!user) return res.status(400).send({ message: "Email is not match" });
    // console.log(user);
    const match = user.chackPassword(req.body.password);

    if (!match)
      return res.status(400).send({ message: "Password is not match" });

    if (user.verified == false)
      return res.status(400).send({ message: "Please verified user email" });

    const token = newToken(user);

    return res.status(201).send({ user, token });
  } catch (error) {
    return send({ message: error.message });
  }
};

module.exports = { register, login };
