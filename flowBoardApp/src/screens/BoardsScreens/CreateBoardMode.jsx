import {
  Box,
  Button,
  Dialog,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { getAuth } from "firebase/auth";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import ModalHeader from "../../components/layout/ModalHeader";
import {
  createBoard,
  fetchBoards,
  showMessage,
} from "../../slices/BoardsSlice";
import { colors } from "../../theme";
const CreateBoardMode = ({ closeModal }) => {
  const [name, setName] = useState("");
  const [color, setColor] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const handleCreateBoard = async () => {
    const uid = getAuth().currentUser.uid;

    try {
      if (!name) {
        dispatch(showMessage("Board name is required"));
      } else {
        setIsLoading(true);
        dispatch(createBoard({ name, color, uid }));
        closeModal();
        dispatch(showMessage("New Board created"));
      }
    } catch (error) {
      console.log(error);
      dispatch(showMessage(error.message));
      setIsLoading(false);
    } finally {
      dispatch(fetchBoards(uid));
      setIsLoading(false);
    }
  };
  // if (isLoading) return <AppLoader />;

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
        <Button
          onClick={() => handleCreateBoard()}
          variant="contained"
          size="large"
          disabled={isLoading}
        >
          Create
        </Button>
      </Stack>
    </Dialog>
  );
};

export default CreateBoardMode;
