import express from "express";
import Blog from "../model/BlogModel.js";
import { upload } from "../middlewares/multermiddleware.js";
import { uploadImageOnCloudinary } from "../helpers/cloudinary.js";
import mongoose from "mongoose";

const router = express.Router();

//blogImage->single ma vako same as schema
router.post("/createBlog", upload.single("blogImage"), async (req, res) => {
  try {
    const { title, introduction, description, userId } = req.body;
    const image = req.file?.fieldname;
    const imagePath = req.file?.path;

    // check if exists
    if (!title || !introduction || !description || !image || !imagePath) {
      return res.status(400).send({
        success: false,
        message: "All fields are required",
        title,
        description,
        introduction,
      });
    }

    //cloudinary

    const { secure_url, public_id } = await uploadImageOnCloudinary(
      imagePath,
      "blogs"
    );
    if (!secure_url) {
      return res.status(400).send({
        success: false,
        message: "Error uploading cloudinary",
        error: secure_url,
      });
    }
    const blog = await Blog.create({
      title,
      description,
      introduction,
      userId: new mongoose.Types.ObjectId(userId),
      blogImage: {
        secure_url,
        public_id,
      },
    });

    return res.status(200).send({
      success: true,
      message: "Product uploded successfully",
      blog,
    });
  } catch (error) {
    return res.status(400).send({
      success: false,
      message: "Error in addblog api",
      error: error.message,
    });
  }
});
// getmyallpost
router.post("/getAllMyBlogs", async (req, res) => {
  const { userId } = req.body;
  try {
    const myAllBlogs = await Blog.find({
      userId: new mongoose.Types.ObjectId(userId),
    })
      .populate("userId", "username email")
      .exec();
    return res.send({
      success: true,
      message: "get all my post success",
      myAllBlogs,
    });
  } catch (error) {
    return res.status(400).send({ success: false, message: error.message });
  }
});

export default router;
