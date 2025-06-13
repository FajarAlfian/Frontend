import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/login";
import { ThemeProvider } from "@mui/material/styles";
import Theme from "./theme";
import Register from "./pages/register";
import NewPass from "./pages/newPass";
import ResetPass from "./pages/resetPass";
import Home from "./pages/home";
import MenuClass from "./pages/menuClass";
import Layout from "./pages/layout";
import Detail from "./pages/detail";
import Checkout from "./pages/checkout";
import "./styles/app.css";

function App() {
  return (
    <>
      <ThemeProvider theme={Theme}>
        <Router>
          <Routes>
            <Route path={"/login"} element={<Login />} />
            <Route path={"/register"} element={<Register />} />
            <Route path={"/new-password"} element={<NewPass />} />
            <Route path={"/reset-password"} element={<ResetPass />} />
            <Route element={<Layout />}>
              <Route path={"/"} element={<Home />} />
              <Route path={"/menuClass"} element={<MenuClass />} />
              <Route path={"/detail"} element={<Detail />} />
              <Route path={"/checkout"} element={<Checkout />} />
            </Route>
          </Routes>
        </Router>
      </ThemeProvider>
    </>
  );
}

export default App;
