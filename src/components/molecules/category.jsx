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
  const [category, setCategory] = useState(null);
  useEffect(() => {
    axios
      .get("http://localhost:5009/api/Categories")
      .then((response) => {
        setCategory(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching category:", error);
      });
  }, []);
  return (
    <Box mx={10} textAlign="center">
      <Box mb={6}>
        <Typography variant="h4" color="dlang.green" fontWeight="bold">
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
              xs={12}
              sm={6}
              md={4} // 4 items per row at md breakpoint
              display="flex"
              justifyContent="center"
            >
              <Card
                sx={{
                  width: 350,
                  maxWidth: 300,
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
                  sx={{
                    width: "100%",
                    height: 150,
                    objectFit: "cover",
                    borderRadius: 1,
                  }}
                />
                <CardContent sx={{ padding: "8px" }}>
                  <Typography variant="body1" fontWeight="medium">
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
