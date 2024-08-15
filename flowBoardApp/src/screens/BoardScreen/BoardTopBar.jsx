import { ArrowBack, Delete } from "@mui/icons-material";
import { AppBar, IconButton, Stack, Toolbar, Typography } from "@mui/material";
import { colors } from "../../theme";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const BoardTopBar = ({ name, color }) => {
  const navigate = useNavigate();
  const { lastUpdated } = useSelector((state) => state.boardData);
  return (
    <AppBar
      sx={{
        borderBottom: `4px solid ${colors[color]}`,
      }}
      position="static"
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Stack alignItems="center" direction="row" spacing={1}>
          <IconButton size="small" onClick={() => navigate("/boards")}>
            <ArrowBack />
          </IconButton>
          <Typography fontWeight="400" variant="h6">
            {name}
          </Typography>
        </Stack>
        <Stack alignItems="center" direction="row" spacing={3}>
          <Typography variant="body2">
            Last updated: {lastUpdated?.toDate().toLocaleString()}
          </Typography>
          <IconButton size="small" x>
            <Delete />
          </IconButton>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default BoardTopBar;
