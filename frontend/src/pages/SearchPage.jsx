// import React, { useState, useEffect } from "react";
// import { useLocation } from "react-router-dom";
// import FullscreenIcon from "@mui/icons-material/Fullscreen";
// import axios from "axios";
// import SearchSingleBlog from "../components/blog/SearchSingleBlog";
// const SearchPage = () => {
//   const query = new URLSearchParams(useLocation().search);
//   const searchInput = query.get("searchinput");
//   const [searchBlogs, setSearchBlogs] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const getSearchBlogs = async () => {
//     setLoading(true);
//     const res = await axios.post(
//       `${import.meta.env.VITE_SERVER_ORIGIN}/blogs/getSearchBlogs`,
//       {
//         searchInput,
//       }
//     );

//     setSearchBlogs(res.data.searchBlogs);

//     setLoading(false);
//   };
//   useEffect(() => {
//     getSearchBlogs();
//   }, [searchInput]);
//   return (
//     <div className="w-full p-4 mx-auto min-h-[80vh] flex flex-col md:w-[80%] md:p-0 md:my-10">
//       <p className="mb-10">
//         Search results for - <span className="font-bold">{searchInput}</span>
//       </p>
//       {loading ? <p>Loading...</p> : ""}
//       {searchBlogs.length == 0 ? (
//         <div className="w-full text-center">
//           <FullscreenIcon sx={{ fontSize: "6rem", color: "gray" }} />
//           <p>No Results Found.</p>
//         </div>
//       ) : (
//         ""
//       )}
//       <div className="w-full lg:w-[85%]">
//         {searchBlogs?.map((myBlog) => {
//           return <SearchSingleBlog key={myBlog._id} myBlog={myBlog} />;
//         })}
//       </div>
//     </div>
//   );
// };

// export default SearchPage;
import React from "react";

const SearchPage = () => {
  return <div>SearchPage</div>;
};

export default SearchPage;
