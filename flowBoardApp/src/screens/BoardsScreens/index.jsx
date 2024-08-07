import { Grid, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import CreateBoardMode from "./CreateBoardMode";
import TopBar from "./TopBar";
import BoardCard from "./BoardCard";
import useApp from "../../hooks/useApp";
import { useDispatch, useSelector } from "react-redux";
import { setBoards } from "../../slices/BoardsSlice";

const BoardsScreen = () => {
  const [showModal, setShowModal] = useState(false);
  const { fetchBoards } = useApp();
  const dispatch = useDispatch();
  useEffect(() => {
    const boards = fetchBoards();
    // dispatch(setBoards(boards));
    console.log(boards);
  }, []);

  return (
    <>
      <TopBar openModal={() => setShowModal(!showModal)} />
      {showModal && <CreateBoardMode closeModal={() => setShowModal(false)} />}
      {/* <NoBoars /> */}
      <Stack mt={5} px={3}>
        <Grid container spacing={4}>
          <BoardCard />
          <BoardCard />
          <BoardCard />
          <BoardCard />
          <BoardCard />
          <BoardCard />
          <BoardCard />
          <BoardCard />
        </Grid>
      </Stack>
    </>
  );
};

export default BoardsScreen;
