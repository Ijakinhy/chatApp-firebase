import { useTheme } from "@emotion/react";
import React from "react";
import { tokens } from "../../theme";
import { Box, Typography } from "@mui/material";

const Header = ({ title, subTitle }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box mb="30px">
      <Typography
        variant="h2"
        fontWeight="bold"
        color={colors.grey[100]}
        sx={{ mb: "5px" }}
      >
        {title}
      </Typography>
      <Typography variant="h5" color={colors.greenAccent[300]}>
        {subTitle}
      </Typography>
    </Box>
  );
};

export default Header;
