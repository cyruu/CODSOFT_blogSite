import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import PrivateRoute from "./utils/PrivateRoute";
import store from "./redux/store";
import Profile from "./pages/Profile";
import PublicRoute from "./utils/PublicRoute";
import { createTheme } from "@mui/material";
import { ThemeProvider } from "@emotion/react";
import CreateBlog from "./components/blog/CreateBlog";
import Footer from "./components/Footer";
import SearchPage from "./pages/SearchPage";
import Blog from "./pages/Blog";
import TestSearch from "./pages/TestSearch";
const myTheme = createTheme({
  typography: {
    button: {
      textTransform: "none",
    },
  },
});
function App() {
  return (
    <>
      <Provider store={store}>
        <ThemeProvider theme={myTheme}>
          <BrowserRouter>
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />}></Route>
              <Route path="/search" element={<SearchPage />}></Route>
              {/* <Route path="/test/:searchInput" element={<TestSearch />}></Route> */}
              <Route path="/blog/:blogId" element={<Blog />}></Route>
              {/* login garepachi matra access hudaina */}
              <Route element={<PrivateRoute />}>
                <Route path="/:username" element={<Profile />}></Route>
                <Route
                  path="/:username/createblog"
                  element={<CreateBlog />}
                ></Route>
              </Route>
              {/* login garepachi access hudaina */}
              <Route element={<PublicRoute />}>
                <Route path="/login" element={<Login />}></Route>
                <Route path="/signup" element={<Signup />}></Route>
              </Route>
            </Routes>
            <Footer />
          </BrowserRouter>
        </ThemeProvider>
      </Provider>
    </>
  );
}

export default App;
