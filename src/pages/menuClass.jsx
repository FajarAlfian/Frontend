import React, { useEffect, useState } from "react";
import CourseListDetail from "../components/molecules/courseListDetail";
import ImageText from "../components/molecules/imageText";
import Divider from "@mui/material/Divider";
import { useParams } from "react-router";
import axios from "axios";
const MenuClass = () => {
  const { nama } = useParams();
  const [language, setLanguage] = useState(null);
  useEffect(() => {
    axios
      .get(`http://localhost:5009/api/Categories/category/${nama}`)
      .then((response) => {
        console.log(response);
        setLanguage(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching category:", error);
      });
  }, [nama]);
  return (
    <div>
      {language ? (
        <>
          <ImageText
            name={language.category_name}
            description={language.category_description}
          />
          <Divider sx={{ marginTop: "80px", marginBottom: "80px" }} />
          <CourseListDetail limit={3} />
        </>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default MenuClass;
