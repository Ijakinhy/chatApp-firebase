import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Box } from "@mui/material";
import {
  Feed,
  VideoDetails,
  ChannelDetails,
  SearchFeed,
  Navbar,
} from "./component";
function App() {
  return (
    <>
      <BrowserRouter>
        <Box sx={{ background: "#000 " }}>
          <Navbar />
          <Routes>
            <Route path="/" exact element={<Feed />} />
            <Route path="/video/:id" exact element={<VideoDetails />} />
            <Route path="/channel/:id" exact element={<ChannelDetails />} />
            <Route path="/search/:searchTerm" exact element={<SearchFeed />} />
          </Routes>
        </Box>
      </BrowserRouter>
    </>
  );
}

export default App;
