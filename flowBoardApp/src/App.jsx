import { onAuthStateChanged } from "firebase/auth";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AppLoader from "./components/layout/AppLoader";
import PrivateRoute from "./components/utils/PrivateRoute";
import PublicOnlyRoute from "./components/utils/PublicOnlyRoute";
import { auth } from "./firebase";
import AuthScreen from "./screens/AuthScreen";
import BoardsScreen from "./screens/BoardsScreens";
import { changeLoginStatus, fetchUserInfo } from "./slices/userSlice";

export default function App() {
  const dispatch = useDispatch();
  const { loading, currentUser } = useSelector((state) => state.user);
  useEffect(() => {
    const unSub = onAuthStateChanged(auth, (user) => {
      dispatch(fetchUserInfo(user?.uid));
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
    </div>
  );
}
