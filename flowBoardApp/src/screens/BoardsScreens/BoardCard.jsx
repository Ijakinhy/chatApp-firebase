import React, { useEffect, useState } from "react";
import { Box, Grid, IconButton, Stack, Typography } from "@mui/material";
import LaunchIcon from "@mui/icons-material/Launch";
import { useSelector } from "react-redux";
import { colors } from "../../theme";
import { useNavigate } from "react-router-dom";

const BoardCard = () => {
  const { boards, createdAt } = useSelector((state) => state.boards);
  const [loading, setLoading] = useState();
  const navigate = useNavigate();
  console.log(createdAt);

  return (
    <>
      {boards?.map((board) => {
        const formattedDate = new Date(board?.createdAt).toLocaleDateString();
        return (
          <Grid item xs={3} key={board.id}>
            <Stack
              p={2}
              bgcolor="background.paper"
              borderLeft="5px solid"
              borderColor={colors[board.color]}
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
                <IconButton
                  size="small"
                  onClick={() => navigate(`/${board.id}`)}
                >
                  <LaunchIcon size="small" />
                </IconButton>
              </Stack>
              <Typography variant="caption">
                {`Created At: ${createdAt}
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
