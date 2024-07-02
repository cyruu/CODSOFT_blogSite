const mongoose = require("mongoose");

async function connect() {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    const conn = mongoose.connection;

    conn.on("connected", () => {
      console.log("db connected");
    });
    conn.on("error", () => {
      console.log("failed to connect to db");
    });
  } catch (error) {
    console.log(error);
  }
}
module.exports = connect;
