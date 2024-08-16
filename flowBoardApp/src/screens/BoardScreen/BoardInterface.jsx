import { Grid } from "@mui/material";
import React, { memo, useCallback, useEffect, useState } from "react";

import AddTaskModal from "./AddTaskModal";
import BoardTab from "./BoardTab";
import { fetchBoard } from "../../slices/boardDataSlice";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { DragDropContext } from "react-beautiful-dnd";
import { doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";

const BoardInterface = ({ boardData, boardId }) => {
  const [addTaskTo, setAddTaskTo] = useState("");
  const [tabs, setTabs] = useState(structuredClone(boardData));
  console.log(tabs);

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
  const handleOpenAddTaskModal = useCallback(
    (status) => setAddTaskTo(statusMap[status]),
    []
  );

  const handleDnd = async ({ source, destination }) => {
    console.log({ source, destination });
    if (!destination) return;
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    )
      return;

    const dClone = structuredClone(tabs);
    /// remove task from the source
    const [draggedTask] = dClone[source.droppableId].splice(source.index, 1);
    /// add the remove task to  the destination
    dClone[destination.droppableId].splice(destination.index, 0, draggedTask);
    console.log(dClone);
    const docRef = doc(db, `users/${uid}/boardsData/${boardId}`);
    await updateDoc(docRef, {
      tabs: dClone,
      lastUpdated: serverTimestamp(),
    });

    dispatch(fetchBoard({ uid, boardId }));

    setTabs(dClone);
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
