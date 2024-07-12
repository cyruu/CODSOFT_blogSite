import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
const MoblieSearch = ({ setSearchStatus }) => {
  const [search, setSearch] = useState();
  return (
    <form
      action="/search"
      method="get"
      className="border-t-[1px] h-max border-gray-300 px-7 py-2 flex bg-red-500 w-[100vw]"
    >
      <SearchIcon className="mr-1" />
      <input
        name="searchinput"
        type="text"
        placeholder="Search"
        className="outline-none flex-initial w-[100vw]"
        style={{ fontSize: ".9rem" }}
        required
      />
      <button onClick={() => setSearchStatus(false)}>
        <CloseIcon className="ml-1" />
      </button>
    </form>
  );
};

export default MoblieSearch;
