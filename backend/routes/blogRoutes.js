const express = require("express");
const router = express.Router();
const Blog = require("../model/BlogModel.js");

router.post("/createBlog", async (req, res) => {
  try {
    console.log(req.body);
    const { title, introduction, description } = req.body;
    const picture = req.file?.fieldname;
    const picturePath = req.file?.path;

    // check if exists
    if (!title || !introduction || !description || !picture || !picturePath) {
      return res
        .status(400)
        .send({ success: false, message: "All fields are required" });
    }

    //uploading image on cloudinary
    const { secure_url, public_id } = await uploadImageOnCloudinary(
      picturePath,
      "blog"
    );

    if (!secure_url) {
      return res.status(400).send({
        success: false,
        message: "Error while uploding image",
        error: secure_url,
      });
    }

    const blog = await Blog.create({
      title,
      introduction,
      description,
      user: req.user._id,
      picture: {
        secure_url,
        public_id,
      },
    });

    return res.status(201).send({
      success: true,
      message: "Product uploded successfully",
      product,
    });
  } catch (error) {
    console.log(`addProductController Error: ${error}`);
    return res.status(400).send({
      success: false,
      message: "Error in addProductController",
      error,
    });
  }
});

module.exports = router;
