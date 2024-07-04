const express = require("express");
const router = express.Router();
const Blog = require("../model/BlogModel.js");

router.post("/createBlog", async (req, res) => {
  console.log(req.body);
  return res.send({ asdf: "asdf" });
});
// router.post("/createBlog", async (req, res) => {
//   try {
//     const addBlog = req.body;
//     const createdBlog = await Blog.create(addBlog);
//     if (createdBlog) {
//       return res
//         .status(200)
//         .send({ success: true, message: "Blog created", createdBlog });
//     }
//     return res
//       .status(200)
//       .send({ success: false, message: "Failed to create blog" });
//   } catch (error) {
//     return res.status(400).send({
//       success: false,
//       message: "create blog api failed",
//       error: error.message,
//     });
//   }
//   return res.send({ body: req.body });
// });

module.exports = router;
