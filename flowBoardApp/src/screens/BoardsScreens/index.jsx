import { Grid, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "../../firebase";
import { fetchBoards } from "../../slices/BoardsSlice";
import BoardCard from "./BoardCard";
import CreateBoardMode from "./CreateBoardMode";
import TopBar from "./TopBar";

const BoardsScreen = () => {
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  const uid = auth.currentUser.uid;
  const { boards, areBoardsFetch } = useSelector((state) => state.boards);

  useEffect(() => {
    dispatch(fetchBoards(uid));
  }, [areBoardsFetch, uid]);

  return (
    <>
      <TopBar openModal={() => setShowModal(!showModal)} />
      {showModal && <CreateBoardMode closeModal={() => setShowModal(false)} />}
      {/* <NoBoars /> */}
      <Stack mt={5} px={3}>
        <Grid container spacing={4}>
          <BoardCard />
        </Grid>
      </Stack>
    </>
  );
};

export default BoardsScreen;
