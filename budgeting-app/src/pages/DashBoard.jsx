import React from "react";
import { fetchData } from "../helpers";
import { useLoaderData } from "react-router-dom";

export const dashBoardLoader = () => {
  const userName = fetchData("userName");
  return { userName };
};

const DashBoard = () => {
  const { userName } = useLoaderData();

  return (
    <div>
      <h1 style={{ color: "red" }}>{userName}</h1>
      DashBoard
    </div>
  );
};

export default DashBoard;
