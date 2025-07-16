import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import { useEffect, useState } from "react";
import axios from "axios";
import { NavLink } from "react-router";
const CategoryCourse = () => {
  const BASE_URL = import.meta.env.VITE_API;
  const [category, setCategory] = useState(null);
  useEffect(() => {
    axios
      .get(`${BASE_URL}/Categories`)
      .then((response) => {
        setCategory(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching category:", error);
      });
  }, []);
  return (
    <Box mx={{ xs: 2, sm: 13 }} textAlign="center">
      <Box mb={6}>
        <Typography
          // variant="h4"
          fontSize={{ xs: "h6.fontSize", sm: "h4.fontSize" }}
          color="dlang.green"
          fontWeight="bold"
        >
          Available Language Course
        </Typography>
      </Box>
      <Grid
        container
        sx={{
          justifyContent: "center",
          alignItems: "center",
        }}
        spacing={5}
        mb={10}
      >
        {category?.map((item) => (
          <NavLink
            to={`/category/${item.category_name}`}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <Grid
              item
              key={item.category_id}
              xs={4}
              sm={6}
              md={4}
              display="flex"
              justifyContent="center"
            >
              <Card
                // width={{ xs: 50, sm: 350 }}
                // maxWidth={{ xs: 200, sm: 300 }}
                sx={{
                  width: { xs: 100, sm: 350 },
                  maxWidth: { xs: 200, sm: 300 },
                  textAlign: "center",
                  border: "1px solid #ccc",
                  padding: 1,
                  boxShadow: 1,
                  borderRadius: 2,
                }}
              >
                <Box
                  component="img"
                  src={item.category_image}
                  alt={item.category_name}
                  // width={{ xs: "30%", sm: "100%" }}
                  height={{ xs: 50, sm: 150 }}
                  sx={{
                    width: "100%",
                    // height: 150,
                    objectFit: "cover",
                    borderRadius: 1,
                  }}
                />
                <CardContent>
                  <Typography
                    // variant="body1"
                    fontSize={{ xs: "12px", sm: "body1.fontSize" }}
                    fontWeight={{ xs: "600", sm: "medium" }}
                  >
                    {item.category_name}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </NavLink>
        ))}
      </Grid>
    </Box>
  );
};
export default CategoryCourse;
