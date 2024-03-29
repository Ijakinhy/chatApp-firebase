import React from "react";
import { fetchData } from "../helpers";

const dashboardLoader = () => {
  const userName = fetchData("userName");
  const budgets = fetchData("budgets");
  return { userName, budgets };
};

export default dashboardLoader;
