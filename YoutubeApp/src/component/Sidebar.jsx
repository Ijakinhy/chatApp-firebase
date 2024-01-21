import React from "react";
import { Stack } from "@mui/material";
import { categories } from "../utils/constants";
import { red } from "@mui/material/colors";

const selectedCategory = "New";

const Sidebar = () => {
  return (
    <Stack
      direction="row"
      sx={{
        flexDirection: { md: "column" },
        height: { sx: "auto", md: "95%" },
      }}
    >
      {categories.map((category, index) => (
        <button
          key={index}
          className="category-btn"
          style={{
            background: category.name === selectedCategory && "#fc1530",
            color: "white",
          }}
        >
          <span
            style={{
              color: category.name === selectedCategory ? "#fff" : red,
              marginRight: "15px",
            }}
          >
            {category.icon}
          </span>
          <span
            style={{
              opacity: category.name === selectedCategory ? 1 : 0.8,
            }}
          >
            {category.name}
          </span>
        </button>
      ))}
    </Stack>
  );
};

export default Sidebar;
