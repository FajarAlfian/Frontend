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
import StatusPurchase from "./pages/statusPurchase";
import Invoice from "./pages/invoice";
import DetailInvoice from "./pages/detailInvoice";
import "./styles/app.css";

function App() {
  const activeLayout = true;
  return (
    <>
      <ThemeProvider theme={Theme}>
        <Router>
          <Routes>
            <Route path={"/login"} element={<Login />} />
            <Route path={"/register"} element={<Register />} />
            <Route path={"/new-password"} element={<NewPass />} />
            <Route path={"/reset-password"} element={<ResetPass />} />
            <Route path={"/purchase-status"} element={<StatusPurchase />} />
            <Route element={<Layout tokenLayout="asdasdsd" />}>
              <Route path={"/"} element={<Home />} />
              <Route path={"/menuClass"} element={<MenuClass />} />
              <Route path={"/detail"} element={<Detail />} />
              <Route path={"/checkout"} element={<Checkout />} />
              <Route path={"/invoice"} element={<Invoice />} />
              <Route path={"/detail-invoice"} element={<DetailInvoice />} />
            </Route>
          </Routes>
        </Router>
      </ThemeProvider>
    </>
  );
}

export default App;
