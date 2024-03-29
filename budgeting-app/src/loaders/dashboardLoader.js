import React from "react";
import { fetchData } from "../helpers";

const dashboardLoader = () => {
  const userName = fetchData("userName");
  const budgets = fetchData("budgets");
  const expenses = fetchData("expenses");
  return { userName, budgets, expenses };
};

export default dashboardLoader;
