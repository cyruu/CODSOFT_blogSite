require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const connect = require("./dbConfig.js");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");

//cookie parser
app.use(cookieParser());
app.use(express.json());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
// app.use(cors());
app.use(morgan("dev"));

connect();
const userRoutes = require("./routes/userRoutes.js");
app.use("/users", userRoutes);

app.get("/getdata", (req, res) => {
  return res.json({ title: "home page" });
});

app.listen(3000, () => {
  console.log("server listening at port 3000");
});
