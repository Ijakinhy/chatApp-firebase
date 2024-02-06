import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/header/Header";
import Sidebar from "./components/sidebar/Sidebar";
import { Container } from "react-bootstrap";
import HomeScreen from "./screen/homeScreen/HomeScreen";
import LoginScreen from "./screen/homeScreen/loginScreen/LoginScreen";
import "./_app.scss";

const Layout = ({ children }) => {
  const [sidebarToggle, setSidebarToggle] = useState(false);

  const handleSidebar = () => setSidebarToggle((toggle) => !toggle);
  return (
    <>
      <Header handleSidebar={handleSidebar} />
      <div className="app_container ">
        <Sidebar sidebarToggle={sidebarToggle} handleSidebar={handleSidebar} />
        <Container fluid className="app_main ">
          {/* <HomeScreen /> */}
          {children}
        </Container>
      </div>
    </>
  );
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          exact
          element={
            <Layout>
              <HomeScreen />
            </Layout>
          }
        />
        <Route path="/auth" element={<LoginScreen />} />
        <Route
          path="/search"
          element={
            <Layout>
              <h1>search results </h1>
            </Layout>
          }
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
