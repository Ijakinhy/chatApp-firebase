import React from "react";
import { Box, Grid, IconButton, Stack, Typography } from "@mui/material";
import LaunchIcon from "@mui/icons-material/Launch";

const BoardCard = () => {
  return (
    <Grid item xs={3}>
      <Stack
        p={2}
        bgcolor="background.paper"
        borderLeft="5px solid"
        borderColor="white"
      >
        <Stack direction="row" justifyContent="space-between">
          <Box width="50%">
            <Typography
              overflow="hidden"
              textOverflow="ellipsis"
              whiteSpace="nowrap"
              variant="h6"
              fontWeight="400"
            >
              Board name
            </Typography>
          </Box>
          <IconButton size="small">
            <LaunchIcon size="small" />
          </IconButton>
        </Stack>
        <Typography variant="caption">Created At: 09/12/2020</Typography>
      </Stack>
    </Grid>
  );
};

export default BoardCard;
