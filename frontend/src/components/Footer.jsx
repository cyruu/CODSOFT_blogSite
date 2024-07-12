import { Typography } from "@mui/material";
import React from "react";
import CopyrightIcon from "@mui/icons-material/Copyright";
const Footer = () => {
  return (
    <div className="bg-gray-800 text-white h-12 flex justify-center items-center md:h-20">
      <CopyrightIcon className="mr-1" />
      <Typography>Cyrus Maharjan</Typography>
    </div>
  );
};

export default Footer;
