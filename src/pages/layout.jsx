import Navbar from "../components/molecules/navbar";
import Footer from "../components/molecules/footer";
import { Outlet } from "react-router";
import { useState } from "react";
const Layout = ({ tokenLayout = "" }) => {
  const [tokenData, setTokenData] = useState(tokenLayout);
  return (
    <>
      <div
        style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
      >
        <Navbar token={tokenData} />
        <div style={{ flex: 1 }}>
          <Outlet />
        </div>
        <Footer />
      </div>
    </>
  );
};
export default Layout;
