import { Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";

const BlogComments = ({ blogId }) => {
  const [allComments, setAllComments] = useState([]);
  const getComments = async () => {
    const res = await axios.post("http://localhost:3000/blogs/getComments", {
      blogId,
    });

    setAllComments(res.data.comments);
  };
  useEffect(() => {
    getComments();
  }, [blogId]);
  return (
    <div className="mb-8">
      <Typography variant="body1" sx={{ fontWeight: "bold", fontSize: "1rem" }}>
        Comments
      </Typography>
      {allComments.length == 0 ? (
        <p>No comments yet.</p>
      ) : (
        allComments.map((comment) => {
          return (
            <div key={comment._id} className="border-b py-2">
              <p className="text-xs">
                <span className="font-bold">{comment.userId[0].username}</span>{" "}
                - {comment.comment}
              </p>
            </div>
          );
        })
      )}
    </div>
  );
};

export default BlogComments;
