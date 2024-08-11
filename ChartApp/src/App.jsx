import { useContext, useEffect } from "react";
import Chat from "./components/chats/Chats";
import Details from "./components/details/Details";
import List from "./components/list/List";
import Login from "./components/login/Login";
import Notification from "./components/notification/Notification";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./lib/firebase";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserInfo } from "./slices/userSlice";

function App() {
  // const { currentUser, isLoading, fetchUserInfo } = useUserStore();
  const dispatch = useDispatch();
  const { currentUser, isLoading } = useSelector((state) => state.user);
  const { chatId } = useSelector((state) => state.chat);
  const user = false;
  useEffect(() => {
    const unSub = onAuthStateChanged(auth, (user) => {
      // console.log(user);
      dispatch(fetchUserInfo(user?.uid));
    });

    return () => {
      unSub();
    };
  }, []);
  // console.log(currentUser);
  if (isLoading) return <div className="loading">Loading...</div>;
  return (
    <div className="container">
      {currentUser ? (
        <>
          {<List />}
          {chatId && <Chat />}
          {chatId && <Details />}
        </>
      ) : (
        <Login />
      )}

      <Notification />
    </div>
  );
}

export default App;
