const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    introduction: {
      type: String,
      required: true,
    },
    blogImage: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// mongoose le aafai User lai users banauncha
module.exports = mongoose.model("Blog", blogSchema);
