import { Grid } from "@mui/material";
import React, { memo, useCallback, useState } from "react";

import { DragDropContext } from "react-beautiful-dnd";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import AppLoader from "../../components/layout/AppLoader";
import { handleDragEnd } from "../../slices/boardDataSlice";
import { showMessage } from "../../slices/BoardsSlice";
import AddTaskModal from "./AddTaskModal";
import BoardTab from "./BoardTab";

const BoardInterface = () => {
  const [addTaskTo, setAddTaskTo] = useState("");
  const { loading, data } = useSelector((state) => state.boardData);
  const [tabs, setTabs] = useState(structuredClone(data));
  const { boardId } = useParams();
  const {
    currentUser: { uid },
  } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const statusMap = {
    toDos: "ToDos",
    inProgress: "In Progress",
    completed: "Completed",
  };

  const handleOpenAddTaskModal = useCallback(
    (status) => setAddTaskTo(statusMap[status]),
    []
  );

  const handleDnd = async ({ source, destination }) => {
    dispatch(handleDragEnd({ source, destination, uid, boardId, data }));
    dispatch(showMessage("board Updated"));
  };

  if (loading) return <AppLoader />;

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
      <DragDropContext onDragEnd={handleDnd}>
        <Grid container mt={2} spacing={2} px={4}>
          {Object.keys(statusMap).map((status) => {
            const lCase = status.toLowerCase();

            return (
              <BoardTab
                key={status}
                tasks={tabs && tabs[lCase]}
                status={status}
                tabName={statusMap[status]}
                handleOpenAddTaskModal={handleOpenAddTaskModal}
              />
            );
          })}
        </Grid>
      </DragDropContext>
    </>
  );
};

export default memo(BoardInterface);
