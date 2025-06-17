import Navbar from "../components/molecules/navbar";
import Navbar2 from "../components/molecules/navbar2";
import Footer from "../components/molecules/footer";
import { Outlet } from "react-router";
const Layout2 = () => {
  return (
    <>
      <Navbar2 />
      <Outlet />
      <Footer />
    </>
  );
};
export default Layout2;
