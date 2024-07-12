import React from "react";

const DetailBlog = ({
  title,
  user,
  month,
  day,
  image,
  introduction,
  description,
}) => {
  return (
    <div className="p-4">
      <p className="text-xl font-bold">{title}</p>
      <p className="text-xs text-gray-500 ">
        {month} {day}, by {user}
      </p>
      <img src={image} alt="" className="mb-3 w-full my-6 md:mr-4 md:w-full" />
      <p className="introduction mt-6 text-sm md:text-md">{introduction}</p>
      <p className="description mt-6 text-sm md:text-md">{description}</p>
    </div>
  );
};

export default DetailBlog;
