import { AddCircleOutline } from "@mui/icons-material";
import { Grid, IconButton, Stack, Typography } from "@mui/material";
import React, { memo, useCallback, useState } from "react";
import Task from "./Task";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { fetchBoard } from "../../slices/boardDataSlice";
import { Droppable } from "react-beautiful-dnd";
import StrictModeDroppable from "../../components/utils/StrictModeDroppable";

const BoardTab = ({ tabName, handleOpenAddTaskModal, tasks, status }) => {
  console.log("tab", tabName);
  const { boardId } = useParams();
  const statusLCase = status.toLowerCase();
  const tbName = tabName.toLowerCase().replace(/\s+/g, "");
  const { data } = useSelector((state) => state.boardData);
  const dispatch = useDispatch();
  const [data1, setData1] = useState(data);

  const {
    currentUser: { uid },
  } = useSelector((state) => state.user);

  const handleDeleteTask = useCallback(
    async (id) => {
      const dClone = structuredClone(data1);
      const taskIndex = dClone[statusLCase].findIndex((tb) => tb.id === id);
      console.log(dClone[tbName]);

      dClone[statusLCase].splice(taskIndex, 1);

      const docRef = doc(db, `users/${uid}/boardsData/${boardId}`);
      await updateDoc(docRef, {
        tabs: dClone,
        lastUpdated: serverTimestamp(),
      });

      dispatch(fetchBoard({ uid, boardId }));

      setData1(dClone);
    },
    [data1]
  );
  return (
    <StrictModeDroppable droppableId={status.toLowerCase()}>
      {(provided) => (
        <Grid item xs={4} {...provided.droppableProps} ref={provided.innerRef}>
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
              {tasks?.map((task, index) => (
                <Task
                  deleteTask={handleDeleteTask}
                  key={task.id}
                  text={task.text}
                  id={task.id}
                  index={index}
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

export default memo(BoardTab);
