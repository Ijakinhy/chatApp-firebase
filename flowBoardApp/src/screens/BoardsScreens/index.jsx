import { Grid, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import CreateBoardMode from "./CreateBoardMode";
import TopBar from "./TopBar";
import BoardCard from "./BoardCard";
import useApp from "../../hooks/useApp";
import { useDispatch, useSelector } from "react-redux";
import { fetchBoards, setBoards } from "../../slices/BoardsSlice";
import { getAuth } from "firebase/auth";
import { auth } from "../../firebase";

const BoardsScreen = () => {
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  const uid = getAuth().currentUser.uid;

  useEffect(() => {
    const boards = dispatch(fetchBoards());
    console.log(` index ${boards}`);

    // dispatch(setBoards(boards));
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
