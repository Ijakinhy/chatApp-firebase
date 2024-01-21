import React, { useState } from "react";
import { Paper, IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Search } from "@mui/icons-material";

const SearchBar = () => {
  return (
    <Paper
      component="form"
      onSubmit={() => {}}
      sx={{
        marginRight: { sm: "50px" },
        borderRadius: 20,
        border: "1px solid #e3e3e3",
        marginTop: "15px",
        pl: 2,
        boxShadow: "none",
      }}
    >
      <input
        className="search-bar"
        type="text"
        placeholder="Search...."
        value=""
        onChange={() => {}}
      />
      <IconButton
        sx={{
          padding: "10px",
          color: "red",
        }}
      >
        <Search />
      </IconButton>
    </Paper>
  );
};

export default SearchBar;
