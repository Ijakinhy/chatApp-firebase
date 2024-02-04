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
  // const handleClick= (item)=> setActiveElement(item)
  return (
    <div className="categoriesBar">
      {keywords.map((item, index) => (
        <span
          onClick={() => setActiveElement(item)}
          key={index}
          className={activeElement === item ? "active" : ""}
        >
          {item}
        </span>
      ))}
    </div>
  );
};

export default CategoriesBar;
