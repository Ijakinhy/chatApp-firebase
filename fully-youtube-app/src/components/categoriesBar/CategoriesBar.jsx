import React, { useState } from "react";
import "./_categoriesBar.scss";

const keywords = [
  "All",
  "React js",
  "Angular js",
  "React Native",
  "use of API",
  "Redux",
  "Music",
  "Algorithm Art ",
  "Guitar",
  "Bengali Songs",
  "Coding",
  "Cricket",
  "Football",
  "Real Madrid",
  "Gatsby",
  "Poor Coder",
  "Shwetabh",
];

const CategoriesBar = () => {
  const [activeElement, setActiveElement] = useState("All");
  const handleClick = (element) => {
    setActiveElement(element);
  };
  return (
    <div className="categoriesaBar">
      {keywords.map((keyword, index) => {
        return (
          <span
            onClick={() => handleClick(keyword)}
            className={activeElement == keyword ? "active" : ""}
            key={index}
          >
            {keyword}
          </span>
        );
      })}
    </div>
  );
};

export default CategoriesBar;
