import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router";
const Search = ({ setSearchStatus }) => {
  const navigate = useNavigate();

  const [searchInput, setSearchInput] = useState("");
  function handleSubmit(e) {
    e.preventDefault();
    navigate(`/search?searchinput=${searchInput}`);
  }
  return (
    <form
      onSubmit={handleSubmit}
      className="border-[1px] h-max my-auto border-gray-300 rounded-full px-2 py-2 flex  items-center "
    >
      <SearchIcon className="mr-1" />
      <input
        // name="searchinput"
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
