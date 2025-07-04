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
import MyClass from "./pages/myClass";
import VerifyEmail from "./pages/verifyEmail";
import "./styles/app.css";
import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";

export const LoginRoute = ({ children }) => {
  const isUserLoggedIn = Cookies.get("token") !== undefined;

  if (!isUserLoggedIn) {
    return <Navigate to="/" />;
  }

  return children;
};

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
            <Route path={"/purchase-status"} element={<StatusPurchase />} />
            <Route path={"/checkout"} element={<Checkout />} />
            <Route path={"/verify-email"} element={<VerifyEmail />} />
            <Route element={<Layout />}>
              <Route path={"/"} element={<Home />} />
              <Route path={"/category/:nama"} element={<MenuClass />} />
              {/* <Route path={"/menuClass"} element={<MenuClass />} /> */}
              <Route path={"/detail/:id"} element={<Detail />} />
              <Route path={"/invoice"} element={<Invoice />} />
              <Route path={"/detail-invoice/:id"} element={<DetailInvoice />} />
              <Route path={"/class"} element={<MyClass />} />
              {/* <Route
                path={"/menuClass"}
                element={
                  <>
                    <LoginRoute>
                      <Layout>
                        <MenuClass />
                      </Layout>
                    </LoginRoute>
                  </>
                }
              /> */}
            </Route>
          </Routes>
        </Router>
      </ThemeProvider>
    </>
  );
}

export default App;
