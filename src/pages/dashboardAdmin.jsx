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
import { Stack } from "@mui/material";
import Navbar from "../components/molecules/navbar";
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
    <>
      <Navbar />
      <Grid container mx={{ xs: 2, sm: 13 }} my={3}>
        <Grid size={2} my={3}>
          <Stack spacing={6}>
            <Typography
              fontSize={{ xs: "16px", sm: 20 }}
              sx={{ color: "#4F4F4F", fontWeight: 600 }}
              textAlign="center"
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
                <Grid key={index}>
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
          </Stack>
        </Grid>
        <Grid size={10}>{renderContent()}</Grid>
      </Grid>
    </>
  );
}

// import React, { useState } from "react";
// import Box from "@mui/material/Box";
// import Grid from "@mui/material/Grid";
// import Typography from "@mui/material/Typography";
// import CategoryManagement from "./CategoryManagement";
// import UserManagement from "./UserManagement";
// import PaymentMethodManagement from "./PaymentMethodManagement";
// import InvoiceManagement from "./InvoiceManagement";
// import CourseManagement from "./CourseManagement";
// import { Stack } from "@mui/material";

// const Dashboard = [
//   { title: "User", key: "user" },
//   { title: "Course", key: "course" },
//   { title: "Payment Method", key: "payment" },
//   { title: "Invoice", key: "invoice" },
//   { title: "Category", key: "category" },
// ];

// export default function DashboardAdmin() {
//   const [activeTab, setActiveTab] = useState("user");

//   const renderContent = () => {
//     switch (activeTab) {
//       case "user":
//         return <UserManagement />;
//       case "course":
//         return <CourseManagement />;
//       case "category":
//         return <CategoryManagement />;
//       case "invoice":
//         return <InvoiceManagement />;
//       case "payment":
//         return <PaymentMethodManagement />;
//       default:
//         return null;
//     }
//   };

//   return (
//     <Box mx={{ xs: 2, sm: 6, md: 10 }} my={3}>
//       <Typography
//         fontSize={{ xs: "16px", sm: 20 }}
//         sx={{ color: "#4F4F4F", fontWeight: 600 }}
//         mb={3}
//         textAlign="center"
//       >
//         Dashboard Admin
//       </Typography>

//       <Grid
//         container
//         spacing={2}
//         justifyContent="center"
//         alignItems="center"
//         sx={{
//           flexDirection: { xs: "column", sm: "row" },
//         }}
//       >
//         {Dashboard.map((item, index) => (
//           <Grid item key={index}>
//             <Box
//               width={{ xs: 125, sm: 160, md: 200 }}
//               sx={{
//                 p: 1,
//                 color: "white",
//                 bgcolor: activeTab === item.key ? "#d88d00" : "#226957",
//                 borderRadius: 2,
//                 boxShadow: 2,
//                 textAlign: "center",
//                 cursor: "pointer",
//                 "&:hover": {
//                   bgcolor: "#d88d00",
//                 },
//               }}
//               onClick={() => setActiveTab(item.key)}
//             >
//               <Typography
//                 fontSize={{ xs: "12px", sm: "14px", md: "16px" }}
//                 fontWeight={500}
//               >
//                 {item.title}
//               </Typography>
//             </Box>
//           </Grid>
//         ))}
//       </Grid>

//       <Box mt={4}>{renderContent()}</Box>
//     </Box>
//   );
// }
