import Navbar from "../components/molecules/navbar";
import Footer from "../components/molecules/footer";
import { Outlet } from "react-router";
const Layout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};
export default Layout;
