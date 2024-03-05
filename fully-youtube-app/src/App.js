import { Container } from "react-bootstrap";
import "./_app.scss";
import Header from "./components/header/Header";
import Sidebar from "./components/sidebar/Sidebar";
import HomeScreen from "./screens/homescreen/HomeScreen";
import { useState } from "react";

function App() {
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
          <HomeScreen />
        </Container>
      </div>
    </>
  );
}

export default App;
