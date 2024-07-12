import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
const Search = ({ setSearchStatus }) => {
  return (
    <form
      action="/search"
      method="get"
      className="border-[1px] h-max my-auto border-gray-300 rounded-full px-2 py-2 flex  items-center "
    >
      <SearchIcon className="mr-1" />
      <input
        name="searchinput"
        type="text"
        placeholder="Search"
        className="outline-none flex-initial w-[250px] mb-1 md:w-[15rem] xl:w-[25rem] sm:w-[200px] md:m-0"
        style={{ fontSize: ".9rem" }}
        required
      />
    </form>
  );
};

export default Search;
