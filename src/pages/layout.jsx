import Navbar from "../components/molecules/navbar";
import Footer from "../components/molecules/footer";
import { Outlet } from "react-router";
import { useState } from "react";
const Layout = ({ tokenLayout = "" }) => {
  const [tokenData, setTokenData] = useState(tokenLayout);
  return (
    <>
      <Navbar token={tokenData} />
      <Outlet />
      <Footer />
    </>
  );
};
export default Layout;
