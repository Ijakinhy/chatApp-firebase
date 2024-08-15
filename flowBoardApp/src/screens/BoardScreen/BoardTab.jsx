import { AddCircleOutline } from "@mui/icons-material";
import { Grid, IconButton, Stack, Typography } from "@mui/material";
import React, { memo, useState } from "react";
import Task from "./Task";

const BoardTab = ({ tabName, handleOpenAddTaskModal, tasks, status }) => {
  console.log("tab", tabName);

  return (
    <Grid item xs={4}>
      <Stack p={3} bgcolor="#000">
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography variant="h6" fontWeight="400">
            {tabName}
          </Typography>
          <IconButton
            onClick={() => handleOpenAddTaskModal(status)}
            size="small"
          >
            <AddCircleOutline fontSize="small" />
          </IconButton>
        </Stack>
        <Stack spacing={2} mt={3}>
          {tasks?.map((task) => (
            <Task key={task.id} text={task.text} id={task.id} />
          ))}
        </Stack>
      </Stack>
    </Grid>
  );
};

export default memo(BoardTab);
