import React, { useState } from "react";
import { Paper, IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Search } from "@mui/icons-material";

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchTerm) {
      navigate(`/search/${searchTerm}`);
      setSearchTerm("");
    }
  };
  return (
    <Paper
      component="form"
      onSubmit={handleSubmit}
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
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
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
