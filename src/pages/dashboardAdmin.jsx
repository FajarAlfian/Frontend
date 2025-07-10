// import Box from "@mui/material/Box";
// import Stack from "@mui/material/Stack";
// import Grid from "@mui/material/Grid";
// import { NavLink } from "react-router";
// import Typography from "@mui/material/Typography";
// import CategoryManagement from "./CategoryManagement";
// import UserManagement from "./UserManagement";
// import PaymentMethodManagement from "./PaymentMethodManagement";
// import InvoiceManagement from "./InvoiceManagement";
// import CourseManagement from "./CourseManagement";
// const Dashboard = [
//   { title: "User", route: "/manage/user" },
//   { title: "Course", route: "/manage/course" },
//   { title: "Payment Method", route: "/manage/payment-method" },
//   { title: "Invoice", route: "/manage/invoice" },
//   { title: "Category", route: "/manage/category" },
// ];
// export default function DashboardAdmin() {
//   return (
//     <Box>
//       <Box mx={{ xs: 2, sm: 13 }} my={3} column={{ xs: 12, sm: 10 }}>
//         <Typography
//           sx={{ color: "#4F4F4F", fontSize: 20, fontWeight: 600 }}
//           mb={3}
//         >
//           Dashboard Admin
//         </Typography>
//         <Grid
//           container
//           spacing={2}
//           flexWrap="wrap"
//           fontSize={{ xs: 12, sm: 2 }}
//         >
//           {Dashboard.map((item, index) => (
//             <NavLink
//               to={item.route}
//               key={index}
//               style={{ textDecoration: "none" }}
//             >
//               <Box
//                 sx={{
//                   width: 200,
//                   padding: 1,
//                   color: "white",
//                   bgcolor: "#F4A100",
//                   borderRadius: 2,
//                   boxShadow: 2,
//                   textAlign: "center",
//                   "&:hover": {
//                     bgcolor: "#d88d00",
//                   },
//                 }}
//               >
//                 <Typography fontSize="18px" fontWeight="500">
//                   {item.title}
//                 </Typography>
//               </Box>
//             </NavLink>
//           ))}
//         </Grid>
//       </Box>
//       <UserManagement />
//       <CategoryManagement />
//       <CourseManagement />
//       <InvoiceManagement />
//       <PaymentMethodManagement />
//     </Box>
//   );
// }
import React, { useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import CategoryManagement from "./CategoryManagement";
import UserManagement from "./UserManagement";
import PaymentMethodManagement from "./PaymentMethodManagement";
import InvoiceManagement from "./InvoiceManagement";
import CourseManagement from "./CourseManagement";

const Dashboard = [
  { title: "User", key: "user" },
  { title: "Course", key: "course" },
  { title: "Payment Method", key: "payment" },
  { title: "Invoice", key: "invoice" },
  { title: "Category", key: "category" },
];

export default function DashboardAdmin() {
  const [activeTab, setActiveTab] = useState("user");

  const renderContent = () => {
    switch (activeTab) {
      case "user":
        return <UserManagement />;
      case "course":
        return <CourseManagement />;
      case "category":
        return <CategoryManagement />;
      case "invoice":
        return <InvoiceManagement />;
      case "payment":
        return <PaymentMethodManagement />;
      default:
        return null;
    }
  };

  return (
    <Box>
      <Box mx={{ xs: 2, sm: 13 }} my={3}>
        <Typography
          fontSize={{ xs: "16px", sm: 20 }}
          sx={{ color: "#4F4F4F", fontWeight: 600 }}
          mb={3}
        >
          Dashboard Admin
        </Typography>
        <Grid
          container
          width="100%"
          spacing={2}
          sx={{
            justifyContent: "space-around",
            alignItems: "center",
          }}
        >
          {Dashboard.map((item, index) => (
            <Grid item key={index}>
              <Box
                width={{ xs: 125, sm: 200 }}
                sx={{
                  padding: 1,
                  color: "white",
                  bgcolor: activeTab === item.key ? "#d88d00" : "#226957",
                  borderRadius: 2,
                  boxShadow: 2,
                  textAlign: "center",
                  cursor: "pointer",
                  "&:hover": {
                    bgcolor: "#d88d00",
                  },
                }}
                onClick={() => setActiveTab(item.key)}
              >
                <Typography
                  fontSize={{ xs: "12px", sm: "16px" }}
                  fontWeight="500"
                >
                  {item.title}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
      {/* <Grid mx={{ xs: 2, sm: 13 }} my={3}>
        <Divider />
      </Grid> */}
      <Box>{renderContent()}</Box>
    </Box>
  );
}
