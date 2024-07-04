import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Blogs from "./pages/Blogs";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import PrivateRoute from "./utils/PrivateRoute";
import store from "./redux/store";
import Profile from "./pages/Profile";
import PublicRoute from "./utils/PublicRoute";
import { createTheme } from "@mui/material";
import { ThemeProvider } from "@emotion/react";
import CreateBlog from "./components/blog/CreateBlog";
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
              <Route path="/blogs" element={<Blogs />}></Route>
              <Route element={<PrivateRoute />}>
                <Route path="/:username" element={<Profile />}></Route>
                <Route
                  path="/:username/createblog"
                  element={<CreateBlog />}
                ></Route>
              </Route>
              <Route element={<PublicRoute />}>
                <Route path="/login" element={<Login />}></Route>
                <Route path="/signup" element={<Signup />}></Route>
              </Route>
            </Routes>
          </BrowserRouter>
        </ThemeProvider>
      </Provider>
    </>
  );
}

export default App;
