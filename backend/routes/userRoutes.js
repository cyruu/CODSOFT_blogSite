const express = require("express");
const router = express.Router();
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../model/UserModel.js");

router.post("/createUser", async (req, res) => {
  const { username, email, password } = req.body;
  try {
    //check if user email exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res
        .status(200)
        .send({ success: false, message: "User already exists" });
    }
    const hashedpass = await bcryptjs.hash(password, 10);
    const user = new User({
      username,
      email,
      password: hashedpass,
    });

    // Save the user to the database
    await user.save();
    return res.status(200).send({ success: true, message: "User created" });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      success: false,
      message: "createUser api fail",
      error: error.message,
    });
  }
});

router.post("/loginUser", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    // invalid email or user not found
    if (!user) {
      return res
        .status(200)
        .send({ success: false, message: "Invalid email." });
    }
    // check password
    const passwordValid = await bcryptjs.compare(password, user.password);
    if (!passwordValid) {
      return res
        .status(200)
        .send({ success: false, message: "Incorrect Password." });
    }
    // correct credentils
    const tokenData = {
      email: user.email,
      id: user._id,
      username: user.username,
    };
    const token = jwt.sign(tokenData, process.env.JWT_SECRET);

    return res
      .cookie("loginToken", token, { httpOnly: true })
      .status(200)
      .send({ success: true, message: "Login Success.", token });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      success: false,
      message: "loginUser api fail",
      error: error.message,
    });
  }
});

router.get("/logout", (req, res) => {
  res.clearCookie("loginToken");
  return res.status(200).send({ success: true, message: "logout success" });
});
module.exports = router;
