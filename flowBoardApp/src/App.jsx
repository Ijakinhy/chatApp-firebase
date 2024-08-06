import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthScreen from "./screens/AuthScreen";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";

export default function App() {
  useEffect(() => {
    const unSub = onAuthStateChanged(auth, (user) => {
      console.log(user);
    });

    return () => unSub();
  }, []);
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AuthScreen />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
