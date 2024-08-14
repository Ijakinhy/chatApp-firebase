import {
  Button,
  Chip,
  Dialog,
  OutlinedInput,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import ModalHeader from "../../components/layout/ModalHeader";

const AddTaskModal = ({ tabName, setAddTaskTo }) => {
  return (
    <Dialog open onClose={() => setAddTaskTo("")} fullWidth maxWidth="xs">
      <Stack p={2} spacing={2}>
        <ModalHeader title="Add Task" onClose={() => setAddTaskTo("")} />

        <Stack direction="row" alignItems="center" spacing={2}>
          <Typography>Status: </Typography>
          <Chip size="small" label={tabName} />
        </Stack>
        <OutlinedInput placeholder="add Task" />

        <Button variant="contained"> Add Task</Button>
      </Stack>
    </Dialog>
  );
};

export default AddTaskModal;
