import React from "react";
import white from "../../images/white.png";
import { Link } from "react-router-dom";

import { Button } from "@mui/material";
const SinglePost = () => {
  function elipsesString(str) {
    return str.slice(0, 260) + "...";
  }
  return (
    <div className="h-96 w-80 bg-red-400 border ">
      <img src={white} className="h-1/2 w-full " />
      <div className="description p-2 pb-3  h-1/2 flex flex-col justify-between items-start">
        <p className="title text-lg font-bold">this is the title</p>
        <p className="details text-xs mt-1 mb-2 flex-grow">
          {elipsesString(
            "ciunt repellendus. Eligendi explicabo possimus, perspiciatis ducimusesse odio distinctio voluptas quamrepellendus. Eligendi explicabo possimus, perspiciatis ducimusesse odio distinctio voluptas quamrepellendus. Eligendi explicabo possimus, perspiciatis ducimusesse odio distinctio voluptas quam velit nulla similique ab praesentium? Placeat perferendis"
          )}
        </p>
        {/* <Link to=""> */}
        <Button
          variant="contained"
          sx={{ marginInline: "auto" }}
          disableElevation
        >
          Read More
        </Button>
        {/* </Link> */}
      </div>
    </div>
  );
};

export default SinglePost;
