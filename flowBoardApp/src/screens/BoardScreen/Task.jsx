import { Delete } from "@mui/icons-material";
import { IconButton, Stack, Typography } from "@mui/material";
import { useSelector } from "react-redux";

const Task = ({ id, text, task, deleteTask }) => {
  return (
    <Stack direction="row" alignItems="center" spacing={1}>
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
  );
};

export default Task;
