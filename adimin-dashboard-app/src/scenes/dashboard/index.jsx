import React from "react";
import Header from "../../component/Header";
import { Box } from "@mui/material";

const Dashboard = () => {
  return (
    <Box m={"20px"}>
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Header title={"DASHBOARD"} subTitle={"Welcome To Your Dashboard"} />
      </Box>
    </Box>
  );
};

export default Dashboard;
