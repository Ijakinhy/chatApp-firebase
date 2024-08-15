import React, { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  Button,
  Chip,
  Dialog,
  OutlinedInput,
  Stack,
  Typography,
} from "@mui/material";
import ModalHeader from "../../components/layout/ModalHeader";
import { showMessage } from "../../slices/BoardsSlice";
import {
  fetchBoard,
  handleLastUpdated,
  updateBoardData,
} from "../../slices/boardDataSlice";
import AppLoader from "../../components/layout/AppLoader";

const AddTaskModal = ({ tabName, setAddTaskTo, taskTab }) => {
  const [name, setName] = useState("");
  const { currentUser } = useSelector((state) => state.user);
  const { loading, AreBoardDataFetched } = useSelector(
    (state) => state.boardData
  );
  const dispatch = useDispatch();
  const boardId = useParams();

  useCallback(() => {
    return dispatch(handleLastUpdated());
  }, []);
  const handleAddTask = () => {
    try {
      dispatch(
        updateBoardData({
          uid: currentUser?.uid,
          boardId: boardId.boardId,
          tabName: taskTab,
          text: name,
        })
      );

      dispatch(showMessage("new task added"));
    } catch (error) {
      dispatch(showMessage(error.message));
    } finally {
      dispatch(fetchBoard({ uid: currentUser.uid, boardId: boardId.boardId }));
    }
  };
  if (loading) return <AppLoader />;

  return (
    <Dialog open onClose={() => setAddTaskTo("")} fullWidth maxWidth="xs">
      <Stack p={2} spacing={2}>
        <ModalHeader title="Add Task" onClose={() => setAddTaskTo("")} />

        <Stack direction="row" alignItems="center" spacing={2}>
          <Typography>Status: </Typography>
          <Chip size="small" label={tabName} />
        </Stack>
        <OutlinedInput
          placeholder="add Task"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <Button disabled={loading} onClick={handleAddTask} variant="contained">
          Add Task
        </Button>
      </Stack>
    </Dialog>
  );
};

export default AddTaskModal;
