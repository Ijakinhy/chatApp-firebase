import React, { useState, useEffect } from "react";
import { Box, Stack, Typography } from "@mui/material";
import { Sidebar, Videos } from "./";
import { fetchFromAPI } from "../utils/fetchFromAPI";
const Feed = () => {
  const [selectedCategory, setSelectedCategory] = useState("New");
  const [videos, setVideos] = useState([]);
  useEffect(() => {
    fetchFromAPI(`search?part=snippet&q=${selectedCategory}`).then((data) =>
      setVideos(data.items)
    );
  }, [selectedCategory]);

  return (
    <Stack sx={{ flexDirection: { sx: "column", md: "row" } }}>
      <Box
        sx={{
          height: { sx: "auto", md: "97vh" },
          borderRight: "1px solid #3d3d3d",
          paddingX: { sx: 0, md: "2px" },
        }}
      >
        <Sidebar
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
        <Typography
          className="copyright"
          variant="body2"
          sx={{ color: "#fff", marginTop: 1.5 }}
        >
          copyright 2023 iJAkinHy
        </Typography>
      </Box>
      <Box padding={2} sx={{ height: "90vh", flex: 2, overflowY: "auto" }}>
        <Typography
          variant="h4"
          fontWeight="bold"
          marginBottom={2}
          sx={{ color: "white" }}
        >
          {selectedCategory}
          {"  "}
          <span style={{ color: "#f31503" }}>Videos</span>
        </Typography>
        <Videos videos={videos} />
      </Box>
    </Stack>
  );
};

export default Feed;
