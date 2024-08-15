import { Grid } from "@mui/material";
import React, { useEffect, useState } from "react";

import AddTaskModal from "./AddTaskModal";
import BoardTab from "./BoardTab";
import { fetchBoard, handleBoardDataUpdate } from "../../slices/boardDataSlice";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const BoardInterface = ({ boardData, boardId }) => {
  const [addTaskTo, setAddTaskTo] = useState("");
  const [tabs, setTabs] = useState(structuredClone(boardData));

  const {
    currentUser: { uid },
  } = useSelector((state) => state.user);
  const { loading } = useSelector((state) => state.boardData);
  const dispatch = useDispatch();
  const statusMap = {
    toDos: "ToDos",
    inProgress: "In Progress",
    completed: "Completed",
  };

  return (
    <>
      {!!addTaskTo && (
        <AddTaskModal
          boardId={boardId}
          setAddTaskTo={setAddTaskTo}
          tabName={addTaskTo}
          taskTab={addTaskTo.toLowerCase().replace(/\s+/g, "")}
        />
      )}
      <Grid container mt={2} spacing={2} px={4}>
        {Object.keys(statusMap).map((status) => {
          const lCase = status.toLowerCase();

          return (
            <BoardTab
              key={status}
              tasks={tabs && tabs[lCase]}
              status={status}
              tabName={statusMap[status]}
              addTask={() => setAddTaskTo(statusMap[status])}
            />
          );
        })}
      </Grid>
    </>
  );
};

export default BoardInterface;
