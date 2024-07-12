import React from "react";
import { Typography, Breadcrumbs, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import AllPosts from "../components/blog/AllPosts";

const Profile = () => {
  const loggedInUser = useSelector((state) => state.loggedInUser);
  return (
    <div className="w-full my-5 mx-auto w-[90%] min-h-[90vh]  md:w-[80%]">
      <div className="profileheader px-6">
        <Breadcrumbs aria-label="breadcrumb" sx={{ marginBottom: "1rem" }}>
          <Link
            underline="hover"
            color="inherit"
            to={`/${loggedInUser.username}`}
          >
            Profile
          </Link>

          <Typography color="text.primary">All Posts</Typography>
        </Breadcrumbs>
        <div className="buttons ">
          <Button
            disableElevation
            variant="contained"
            className="rounded-full"
            sx={{ borderRadius: "50px", bgcolor: "black" }}
          >
            All Posts
          </Button>
          <Link to="createblog">
            <Button
              variant="outlined"
              color="inherit"
              sx={{ borderRadius: "50px", marginLeft: "1rem" }}
            >
              Create a Blog
            </Button>
          </Link>
        </div>
      </div>
      {/* all blogs */}
      <AllPosts loggedInUser={loggedInUser} />
    </div>
  );
};

export default Profile;
