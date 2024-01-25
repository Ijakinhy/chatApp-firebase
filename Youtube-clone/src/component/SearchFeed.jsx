import React, { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import { Videos } from ".";
import { fetchFromAPI } from "../utils/fetchFromAPI";
import { useParams } from "react-router-dom";
const Feed = () => {
  const [videos, setVideos] = useState([]);
  const { searchTerm } = useParams();
  useEffect(() => {
    fetchFromAPI(`search?part=snippet&q=${searchTerm}`).then((data) =>
      setVideos(data.items)
    );
  }, [searchTerm]);

  return (
    <Box
      padding={2}
      sx={{ height: "90vh", marginLeft: "100px", flex: 2, overflowY: "auto" }}
    >
      <Typography
        variant="h4"
        fontWeight="bold"
        marginBottom={2}
        sx={{ color: "white" }}
      >
        Search Results for:{" "}
        <span style={{ color: "#f31503" }}>{searchTerm}</span> videos
      </Typography>
      <Videos videos={videos} />
    </Box>
  );
};

export default Feed;
