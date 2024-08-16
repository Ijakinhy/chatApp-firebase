import { Delete } from "@mui/icons-material";
import { IconButton, Stack, Typography } from "@mui/material";
import { Draggable } from "react-beautiful-dnd";
import { useSelector } from "react-redux";

const Task = ({ index, id, text, task, deleteTask }) => {
  return (
    <Draggable draggableId={id} index={index}>
      {(provided) => (
        <Stack
          {...provided.dragHandleProps}
          {...provided.draggableProps}
          ref={provided.innerRef}
          direction="row"
          alignItems="center"
          spacing={1}
        >
          <Typography
            sx={{
              border: "1px solid #777980",
              bgcolor: "#45474e",
              p: 1,
              width: "100%",
            }}
          >
            {text}
          </Typography>
          <IconButton size="small" onClick={() => deleteTask(id)}>
            <Delete />
          </IconButton>
        </Stack>
      )}
    </Draggable>
  );
};

export default Task;
