import { Delete } from "@mui/icons-material";
import { IconButton, Stack, Typography } from "@mui/material";

const Task = ({ id, text }) => {
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
      <IconButton size="small">
        <Delete />
      </IconButton>
    </Stack>
  );
};

export default Task;
