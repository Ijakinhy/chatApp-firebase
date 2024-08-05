import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthScreen from "./screens/AuthScreen";

export default function App() {
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
