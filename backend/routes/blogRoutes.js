import express from "express";
import Blog from "../model/BlogModel.js";
import Comment from "../model/CommentModel.js";
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
//get featured blogs
router.get("/getFeaturedBlogs", async (req, res) => {
  try {
    const featuredBlogs = await Blog.aggregate([
      { $sample: { size: 4 } }, // Randomly select 4 documents
      {
        $lookup: {
          from: "users", // Collection name in the database
          localField: "userId",
          foreignField: "_id",
          as: "userId",
        },
      },
    ]).exec();
    return res.send({
      success: true,
      message: "get featured blogs success",
      featuredBlogs,
    });
  } catch (error) {
    return res.status(400).send({ success: false, message: error.message });
  }
});
//get featured blogs
router.get("/getRecentBlogs", async (req, res) => {
  try {
    const recentBlogs = await Blog.aggregate([
      {
        $sort: { createdAt: -1 }, // descending order
      },
      {
        $limit: 6,
      },
      {
        $lookup: {
          from: "users",
          localField: "userId",
          foreignField: "_id",
          as: "userId",
        },
      },
    ]).exec();
    return res.send({
      success: true,
      message: "get featured blogs success",
      recentBlogs,
    });
  } catch (error) {
    return res.status(400).send({ success: false, message: error.message });
  }
});
//get search blogs
router.post("/getSearchBlogs", async (req, res) => {
  const { searchInput } = req.body;
  try {
    const searchBlogs = await Blog.aggregate([
      {
        $match: {
          $or: [
            { title: { $regex: searchInput, $options: "i" } },
            { content: { $regex: searchInput, $options: "i" } },
            // Add other fields if needed
          ],
        },
      },

      {
        $limit: 8,
      },
      {
        $lookup: {
          from: "users",
          localField: "userId",
          foreignField: "_id",
          as: "userId",
        },
      },
    ]).exec();
    return res.send({
      success: true,
      message: "get search blogs success",
      searchBlogs,
    });
  } catch (error) {
    return res.status(400).send({ success: false, message: error.message });
  }
});
//get single blog by id
router.post("/getBlog", async (req, res) => {
  const { blogId } = req.body;
  try {
    const blog = await Blog.aggregate([
      {
        $match: { _id: new mongoose.Types.ObjectId(blogId) }, // Match the blog by its ID
      },
      {
        $lookup: {
          from: "users", // The collection you want to join with
          localField: "userId", // Field from the 'blogs' collection
          foreignField: "_id", // Field from the 'users' collection
          as: "userId", // The name of the array field to store the joined data
        },
      },
    ]).exec();
    return res.send({
      success: true,
      message: "get search blogs success",
      blog,
    });
  } catch (error) {
    return res.status(400).send({ success: false, message: error.message });
  }
});
//get random you may like blog
router.get("/getYouMayLike", async (req, res) => {
  const { blogId } = req.body;
  try {
    const blog = await Blog.aggregate([
      { $sample: { size: 6 } }, // Randomly select 4 documents
      {
        $lookup: {
          from: "users", // Collection name in the database
          localField: "userId",
          foreignField: "_id",
          as: "userId",
        },
      },
    ]).exec();
    return res.send({
      success: true,
      message: "get you may like blogs success",
      blog,
    });
  } catch (error) {
    return res.status(400).send({ success: false, message: error.message });
  }
});
// add comment to blog
router.post("/addComment", async (req, res) => {
  const { blogId, comment, userId } = req.body;
  console.log(req.body);
  try {
    const commentadded = await Comment.create({
      comment,
      userId,
      blogId,
    });
    return res.send({
      success: true,
      message: "commed added blogs success",
      commentadded,
    });
  } catch (error) {
    return res.status(400).send({ success: false, message: error.message });
  }
});
// get comment to blog
router.post("/getcomments", async (req, res) => {
  const { blogId } = req.body;

  try {
    const comments = await Comment.aggregate([
      {
        $match: { blogId: new mongoose.Types.ObjectId(blogId) }, // Match the blog by its ID
      },
      {
        $lookup: {
          from: "users", // Collection name in the database
          localField: "userId",
          foreignField: "_id",
          as: "userId",
        },
      },
    ]).exec();

    return res.send({
      success: true,
      message: "get all comments blogs success",
      comments,
    });
  } catch (error) {
    return res.status(400).send({ success: false, message: error.message });
  }
});

export default router;
