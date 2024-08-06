import React, { useState } from "react";
import TopBar from "./TopBar";
import CreateBoardMode from "./CreateBoardMode";
import { Grid, IconButton, Stack, Typography } from "@mui/material";
import NoBoars from "./Noboars";
import LaunchIcon from "@mui/icons-material/Launch";
const BoardsScreen = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <TopBar openModal={() => setShowModal(!showModal)} />
      {showModal && <CreateBoardMode closeModal={() => setShowModal(false)} />}
      {/* <NoBoars /> */}
      <Grid container>
        <Grid item xs={3}>
          <Stack
            p={2}
            bgcolor="background.paper"
            borderLeft="5px solid"
            borderColor="white"
          >
            <Stack direction="row" justifyContent="space-between">
              <Typography variant="h6" fontWeight="400">
                Board name
              </Typography>
              <IconButton size="small">
                <LaunchIcon size="small" />
              </IconButton>
            </Stack>
            <Typography>Created At: 09/12/2020</Typography>
          </Stack>
        </Grid>
      </Grid>
    </>
  );
};

export default BoardsScreen;
