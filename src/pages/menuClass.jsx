import React from "react";
import CourseListDetail from "../components/molecules/courseListDetail";
import ImageText from "../components/molecules/imageText";
import Divider from '@mui/material/Divider';


const MenuClass = () => {
  return (
    <div>
      <ImageText />
      <Divider sx={{marginTop:"80px", marginBottom:"80px"}} />
      <CourseListDetail limit={3} />
    </div>
  );
};

export default MenuClass;
