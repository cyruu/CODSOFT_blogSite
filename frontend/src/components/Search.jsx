import React from "react";
import SearchIcon from "@mui/icons-material/Search";
const Search = () => {
  return (
    <div className="border-[1px] h-max my-auto border-gray-300 rounded-full px-2 py-2 flex hidden md:flex items-center ">
      <SearchIcon className="mr-1" />
      <input
        type="text"
        placeholder="Search"
        className="outline-none flex-initial w-[200px] md:w-[15rem] xl:w-[25rem]"
        style={{ fontSize: ".9rem" }}
      />
    </div>
  );
};

export default Search;
