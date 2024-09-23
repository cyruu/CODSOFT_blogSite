import { Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";

const BlogComments = ({ blogId }) => {
  const [allComments, setAllComments] = useState([]);
  const getComments = async () => {
    const res = await axios.post(
      `${import.meta.env.VITE_SERVER_ORIGIN}/blogs/getComments`,
      {
        blogId,
      }
    );
    // redis?
    setAllComments(res.data.comments);
  };
  useEffect(() => {
    getComments();
  }, [blogId]);
  return (
    <div className="mb-8 px-4">
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
