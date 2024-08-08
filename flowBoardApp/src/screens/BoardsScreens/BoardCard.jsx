import React from "react";
import { Box, Grid, IconButton, Stack, Typography } from "@mui/material";
import LaunchIcon from "@mui/icons-material/Launch";
import { useSelector } from "react-redux";

const BoardCard = () => {
  const { boards } = useSelector((state) => state.boards);

  return (
    <>
      {boards?.map((board) => {
        const { createdAt } = board;
        const dateString = createdAt?.toDate();
        const formattedDate = dateString?.toLocaleString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        });

        return (
          <Grid item xs={3} key={board.id}>
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
                    {board.name}
                  </Typography>
                </Box>
                <IconButton size="small">
                  <LaunchIcon size="small" />
                </IconButton>
              </Stack>
              <Typography variant="caption">
                {`Created At: ${formattedDate}
              `}
              </Typography>
            </Stack>
          </Grid>
        );
      })}
    </>
  );
};

export default BoardCard;
