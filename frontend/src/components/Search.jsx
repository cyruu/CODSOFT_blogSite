import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
const Search = ({ setSearchStatus }) => {
  const [searchInput, setSearchInput] = useState("");
  async function handleSubmit(e) {
    e.preventDefault();
    await axios.post(`${import.meta.env.VITE_SERVER_ORIGIN}/blogs/search`, {
      searchInput,
    });
    window.location.href = `/search?searchinput=${searchInput}`;
  }
  return (
    // <form
    //   action="/search"
    //   method="get"
    //   className="border-[1px] h-max my-auto border-gray-300 rounded-full px-2 py-2 flex  items-center "
    // >
    <form
      onSubmit={handleSubmit}
      className="border-[1px] h-max my-auto border-gray-300 rounded-full px-2 py-2 flex  items-center "
    >
      <SearchIcon className="mr-1" />
      <input
        name="searchinput"
        type="text"
        placeholder="Search"
        className="outline-none flex-initial w-[250px] mb-1 md:w-[15rem] xl:w-[25rem] sm:w-[200px] md:m-0"
        style={{ fontSize: ".9rem" }}
        value={searchInput}
        onChange={({ target }) => setSearchInput(target.value)}
        required
      />
    </form>
  );
};

export default Search;
