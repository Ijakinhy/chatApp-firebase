import { AddCircleOutline } from "@mui/icons-material";
import { Grid, IconButton, Stack, Typography } from "@mui/material";
import React from "react";
import StrictModeDroppable from "../../components/utils/StrictModeDroppable";
import Task from "./Task";

const BoardTab = ({ tabName, handleOpenAddTaskModal, tasks, status }) => {
  // console.log(status);

  // console.log("tab", tabName);

  return (
    <StrictModeDroppable droppableId={status.toLowerCase()}>
      {(provided) => (
        <Grid
          item
          xs={12}
          sm={12}
          md={4}
          {...provided.droppableProps}
          ref={provided.innerRef}
        >
          <Stack
            p={{
              xs: 1.2,
              sm: 1.6,
              md: 2.5,
            }}
            bgcolor="#000"
          >
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
              {tasks?.map((task, index) => (
                <Task
                  key={task.id}
                  text={task.text}
                  id={task.id}
                  index={index}
                  status={status.toLowerCase()}
                />
              ))}
            </Stack>
            {provided.placeholder}
          </Stack>
        </Grid>
      )}
    </StrictModeDroppable>
  );
};

export default BoardTab;
