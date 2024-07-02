import React from "react";
import SearchIcon from "@mui/icons-material/Search";
const Search = () => {
  return (
    <div className="border-[1px] border-gray-300 rounded-full px-2 py-1">
      <SearchIcon className="mr-1" />
      <input
        type="text"
        placeholder="Search"
        className="outline-none w-[500px]"
        style={{ fontSize: ".9rem" }}
      />
    </div>
  );
};

export default Search;
