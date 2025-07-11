import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import Theme from "./theme";
import Cookies from "js-cookie";
import AuthProvider from "./utils/authProvider";
import Login from "./pages/login";
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
import { SnackbarProvider } from "./components/molecules/snackbar";
import "./styles/app.css";
// import AdminInvoices from "./pages/invoiceManagement";
// import UserManagement from "./pages/userManagement";
// import CourseManagement from "./pages/courseManagement";
// import PaymentMethodManagement from "./pages/paymentMethodManagement";
// import CategoryManagement from "./pages/CategoryManagement";
import DashboardAdmin from "./pages/dashboardAdmin";
function App() {
  return (
    <ThemeProvider theme={Theme}>
      <SnackbarProvider>
        <AuthProvider>
          <Router>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/new-password" element={<NewPass />} />
              <Route path="/reset-password" element={<ResetPass />} />
              <Route path="/purchase-status" element={<StatusPurchase />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/verify-email" element={<VerifyEmail />} />
              <Route element={<Layout />}>
                <Route path="/" element={<Home />} />
                <Route path="/class" element={<MyClass />} />
                <Route path="/category/:nama" element={<MenuClass />} />
                <Route path="/detail/:id" element={<Detail />} />
                <Route path="/invoice" element={<Invoice />} />
                {/* <Route path="/dashboard-admin" element={<DashboardAdmin />} /> */}
                <Route path="/detail-invoice/:id" element={<DetailInvoice />} />
                {/* <Route path="/manage/invoice" element={<AdminInvoices />} />
                <Route path="/manage/user" element={<UserManagement />} />
                <Route path="/manage/course" element={<CourseManagement />} />
                <Route
                  path="/manage/category"
                  element={<CategoryManagement />}
                />
                <Route
                  path="/manage/payment-method"
                  element={<PaymentMethodManagement />}
                /> */}
              </Route>
              <Route path="/dashboard-admin" element={<DashboardAdmin />} />
            </Routes>
          </Router>
        </AuthProvider>
      </SnackbarProvider>
    </ThemeProvider>
  );
}

export default App;
