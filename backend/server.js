import dotenv from "dotenv";
dotenv.config();

import express from "express";
const app = express();

import cors from "cors";
import connect from "./dbConfig.js";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";
import userRoutes from "./routes/userRoutes.js";
import blogRoutes from "./routes/blogRoutes.js";

//cookie parser
app.use(cookieParser());
app.use(express.json());
app.use(cors({ origin: process.env.SERVER_ORIGIN, credentials: true }));
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

app.listen(3000, () => {
  console.log("server listening at port 3000");
});
