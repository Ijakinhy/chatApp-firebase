import { ArrowBack, Delete } from "@mui/icons-material";
import { AppBar, IconButton, Stack, Toolbar, Typography } from "@mui/material";
import { colors } from "../../theme";
import { useNavigate } from "react-router-dom";

const BoardTopBar = ({ lastUpdated, name, color }) => {
  const navigate = useNavigate();

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
          <Typography variant="body2">Last updated: {lastUpdated}</Typography>
          <IconButton size="small" x>
            <Delete />
          </IconButton>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default BoardTopBar;
