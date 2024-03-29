import React from "react";
import { fetchData } from "../helpers";

const mainLoader = () => {
  const userName = fetchData("userName");
  return { userName };
};

export default mainLoader;
