import React from "react";
import CourseListWithPagination from "../components/molecules/courseListWithPagination"; 
import ImageWithText from "../components/molecules/imageText";
import Navbar from "../components/molecules/navbar";
import Footer from "../components/molecules/footer";

const MenuClass = () => {
  return (
    <div>
      <Navbar />
      <ImageWithText/>
      <CourseListWithPagination limit={3} /> 
      <Footer />
    </div>
  );
};

export default MenuClass;
