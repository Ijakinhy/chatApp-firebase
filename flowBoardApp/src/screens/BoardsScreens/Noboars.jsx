import { Stack, Typography } from "@mui/material";
import React from "react";

const NoBoars = () => {
  return (
    <Stack textAlign="center" mt={15} spacing={1}>
      <Typography variant="h5">No boards created</Typography>
      <Typography>Create your first board today!</Typography>
    </Stack>
  );
};

export default NoBoars;
