import { Grid } from "@mui/material";
import React, { useState } from "react";

import AddTaskModal from "./AddTaskModal";
import BoardTab from "./BoardTab";

const BoardInterface = ({ boardData }) => {
  const [addTaskTo, setAddTaskTo] = useState("");
  const [tabs, setTabs] = useState(structuredClone(boardData));

  const statusMap = {
    toDos: "Todos",
    inProgress: "In Progress",
    completed: "Completed",
  };
  return (
    <>
      {!!addTaskTo && (
        <AddTaskModal setAddTaskTo={setAddTaskTo} tabName={addTaskTo} />
      )}
      <Grid container mt={2} spacing={2} px={4}>
        {Object.keys(statusMap).map((status) => {
          return (
            <BoardTab
              key={status}
              tasks={tabs[status]}
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
