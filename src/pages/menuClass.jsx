import React, { useEffect, useState } from "react";
import CourseListDetail from "../components/molecules/courseListDetail";
import ImageText from "../components/molecules/imageText";
import Divider from "@mui/material/Divider";
import { useParams } from "react-router-dom";    
import axios from "axios";

const MenuClass = () => {
  const BASE_URL = import.meta.env.VITE_API;
  const { nama } = useParams();
  const [language, setLanguage] = useState(null);

  useEffect(() => {
    axios
      .get(`${BASE_URL}/Categories/category/${nama}`)
      .then((response) => {
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
            foto={language.category_banner}
          />
          <Divider sx={{ marginTop: "80px", marginBottom: "80px" }} />
          <CourseListDetail
            limit={6}
            name={language.category_name}
            categoryId={language.category_id}
          />
        </>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default MenuClass;
