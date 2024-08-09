import { AppBar, Button, Stack, Toolbar } from "@mui/material";
import React from "react";
import ImageEl from "../../components/utils/ImageEl";
import logoImg from "../../assets/logo.svg";
import LogoutIcon from "@mui/icons-material/ExitToApp";
import { auth } from "../../firebase";
const TopBar = ({ openModal }) => {
  return (
    <AppBar position="static">
      <Toolbar
        sx={{
          justifyContent: "space-between",
        }}
      >
        <ImageEl
          sx={{
            height: "25px",
          }}
          src={logoImg}
          alt="logo"
        />
        <Stack direction="row" spacing={2}>
          <Button variant="contained" onClick={openModal}>
            Create Board
          </Button>
          <Button
            startIcon={<LogoutIcon />}
            onClick={() => auth.signOut()}
            color="inherit"
          >
            Logout
          </Button>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;
