import React from "react";
import { fetchData } from "./helpers";

const dashboardLoader = () => {
  const userName = fetchData("userName");
  return { userName };
};

export default dashboardLoader;
