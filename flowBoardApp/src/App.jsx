import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthScreen from "./screens/AuthScreen";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import { useDispatch, useSelector } from "react-redux";
import { changeLoginStatus } from "./slices/userSlice";
import AppLoader from "./components/layout/AppLoader";
import PublicOnlyRoute from "./components/utils/PublicOnlyRoute";
import BoardsScreen from "./screens/BoardsScreens";
import PrivateRoute from "./components/utils/PrivateRoute";
import Notification from "./Notification";

export default function App() {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.user);
  useEffect(() => {
    const unSub = onAuthStateChanged(auth, (user) => {
      dispatch(changeLoginStatus(!!user));
    });

    return () => unSub();
  }, []);

  if (loading) {
    return <AppLoader />;
  }
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={<PublicOnlyRoute Component={AuthScreen} />}
          />
          <Route
            path="/boards"
            element={<PrivateRoute Component={BoardsScreen} />}
          />
        </Routes>
      </BrowserRouter>
      <Notification />
    </div>
  );
}
