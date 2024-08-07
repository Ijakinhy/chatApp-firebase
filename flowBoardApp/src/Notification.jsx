import { Stack } from "@mui/material";
import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Notification = () => {
  return (
    <Stack>
      <ToastContainer position="top-center" />
    </Stack>
  );
};

export default Notification;
