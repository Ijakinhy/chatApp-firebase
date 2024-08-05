import { createTheme } from "@mui/material";

export const theme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#1D1F26",
    },
    primary: {
      main: "#BEA4FF",
    },
  },
  typography: {
    fontFamily: "lato, sans-serif",
    button: {
      textTransform: "unset",
      fontWeight: "700",
    },
  },
  shape: {
    borderRadius: 0,
  },
});
