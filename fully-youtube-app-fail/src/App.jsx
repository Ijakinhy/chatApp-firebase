import { Container } from "react-bootstrap";
import "./_app.scss";
import Header from "./components/header/Header";
import Sidebar from "./components/sidebar/Sidebar";
import HomeScreen from "./screens/homescreen/HomeScreen";
import { useEffect, useState } from "react";
import LoginScreen from "./screens/loginsceen/LoginScreen";
import { useNavigate, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import WatchScreen from "./screens/watchScreen/WatchScreen";

const Layout = ({ children }) => {
  const [toggleSidebar, setSidebarToggle] = useState(false);
  const handleToggleSidebar = () => {
    setSidebarToggle(!toggleSidebar);
  };
  return (
    <>
      <Header handleToggleSidebar={handleToggleSidebar} />
      <div className="app_container">
        <Sidebar
          toggleSidebar={toggleSidebar}
          handleToggleSidebar={handleToggleSidebar}
        />

        <Container fluid className="app_main">
          {children}
        </Container>
      </div>
    </>
  );
};

function App() {
  const navigate = useNavigate();
  const { accessToken, loading } = useSelector((state) => state.auth);
  useEffect(() => {
    if (!loading && !accessToken) {
      navigate("/auth");
    }
  }, [accessToken, loading, navigate]);
  return (
    <>
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
              <h1>search results</h1>
            </Layout>
          }
        />
        <Route
          path="/watch/:id"
          element={
            <Layout>
              <WatchScreen />
            </Layout>
          }
        />
        <Route
          path="*"
          exact
          element={
            <Layout>
              <HomeScreen />
            </Layout>
          }
        />
      </Routes>
    </>
  );
}

export default App;
