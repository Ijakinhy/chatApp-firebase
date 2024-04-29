import { useState } from "react";
import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import TopBar from "./scenes/global/Topbar";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./scenes/dashboard";
import Sidebar from "./scenes/global/Sidebar";
// import Dashboard from './scenes/dashboard'
// import Team from './scenes/team'
// import Invoice from './scenes/invoice'
// import Contact from './scenes/contact'
// import Bar from './scenes/bar'
// import Form from './scenes/form'
// import Pie from './scenes/pie'
// import Geography from './scenes/geography'
// import FAQ from './scenes/faq'
// import Line from './scenes/line'
// import Calendar from "./scenes/calendar";

function App() {
  const [theme, colorMode] = useMode();

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <Sidebar />
          <main className="content">
            <TopBar />
            <Routes>
              <Route path="/dashboard" element={<Dashboard />} />
              {/* <Route path="/team" element={<Team/>}/>
              <Route path="/invoice" element={<Invoice/>}/>
              <Route path="/contact" element={<Contact/>}/> 
              <Route path="/form" element={<Form/>}/> 
              <Route path="/bar" element={<Bar/>}/>
              <Route path="/pie" element={<Pie/>}/>
              <Route path="/geography" element={<Geography/>}/>
              <Route path="/faq" element={<FAQ/>}/>
              <Route path="/line" element={<Line/>}/> */}
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
