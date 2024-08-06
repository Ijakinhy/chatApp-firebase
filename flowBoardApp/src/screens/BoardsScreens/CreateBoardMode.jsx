import { ClassOutlined, Close } from "@mui/icons-material";
import {
  Box,
  Button,
  Dialog,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import ModalHeader from "../../components/layout/ModalHeader";
import { colors } from "../../theme";

const CreateBoardMode = ({ closeModal }) => {
  const [name, setName] = useState("");
  const [color, setColor] = useState(0);

  console.log(color, name);

  return (
    <Dialog open onClose={closeModal} fullWidth maxWidth="xs">
      <Stack p={2}>
        <ModalHeader title="Create Board" onClose={closeModal} />
        <Stack my={5} spacing={3}>
          <TextField
            label="Board Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Stack direction="row" spacing={1}>
            <Typography>Color: </Typography>
            {colors.map((clr, index) => (
              <Box
                sx={{
                  cursor: "pointer",
                  border: color === index ? "3px solid #383838" : "none",
                  outline: `2px solid ${clr}`,
                }}
                onClick={() => setColor(index)}
                height="25px"
                width="25px"
                borderRadius="50% "
                bgcolor={clr}
                key={clr}
              />
            ))}
          </Stack>
        </Stack>
        <Button variant="contained" size="large">
          Create
        </Button>
      </Stack>
    </Dialog>
  );
};

export default CreateBoardMode;
