import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import AppLoader from "../../components/layout/AppLoader";
import { fetchBoard } from "../../slices/boardDataSlice";
import BoardInterface from "./BoardInterface";
import BoardTopBar from "./BoardTopBar";
const BoardScreen = () => {
  const { boardId } = useParams();

  const { boardData, lastUpdated, data, loading } = useSelector(
    (state) => state.boardData
  );
  const { boards, areBoardsFetch } = useSelector((state) => state.boards);

  const { currentUser } = useSelector((state) => state.user);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const singleBoard = useMemo(
    () => boards.find((board) => board.id === boardId),
    []
  );

  const boardDataList = useMemo(() => {
    return data;
  }, [data]);

  console.log(data);

  const handleFetchBoard = async () => {
    try {
      const result = dispatch(
        fetchBoard({ uid: currentUser.uid, boardId: singleBoard?.id })
      );

      // if (boardData) {
      //   setData(boardData.tabs);
      //   setLastUpdated(boardData?.lastUpdated.toDate().toLocaleString());
      // }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    if (!areBoardsFetch || !singleBoard) navigate("/boards");
    else {
      handleFetchBoard();
    }
  }, []);
  if (loading) return <AppLoader />;
  return (
    <>
      <BoardTopBar
        name={singleBoard?.name}
        color={singleBoard?.color}
        lastUpdated={lastUpdated?.toDate().toLocaleString()}
      />
      <BoardInterface boardData={boardDataList} />
    </>
  );
};

export default BoardScreen;
