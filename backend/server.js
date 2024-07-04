require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const connect = require("./dbConfig.js");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const userRoutes = require("./routes/userRoutes.js");
const blogRoutes = require("./routes/blogRoutes.js");

//cookie parser
app.use(cookieParser());
app.use(express.json());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
// app.use(cors());
app.use(morgan("dev"));

connect();
//users
app.use("/users", userRoutes);
//blogs
app.use("/blogs", blogRoutes);

app.get("/decodeJwtToken", (req, res) => {
  const loginToken = req.cookies.loginToken;
  if (!loginToken) {
    return res
      .status(200)
      .send({ success: false, message: "Token Not Found", decodedToken: null });
  }

  try {
    const decodedToken = jwt.verify(loginToken, process.env.JWT_SECRET);
    return res.status(200).send({
      success: true,
      message: "Token decoded successfully",
      decodedToken,
    });
  } catch (error) {
    return res
      .status(400)
      .send({ success: false, message: "Decode jwt token api failed" });
  }
});

app.get("/getdata", (req, res) => {
  return res.json({ title: "home page" });
});

app.get("/getimage", (req, res) => {
  try {
    Post.find({})
      .then((data) => res.json(data))
      .catch((err) => res.json({ err }));
  } catch (error) {}
});

app.listen(3000, () => {
  console.log("server listening at port 3000");
});
