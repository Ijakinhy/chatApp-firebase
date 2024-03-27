import { RouterProvider, createBrowserRouter } from "react-router-dom";
import DashBoard, { dashBoardLoader } from "./pages/DashBoard";

const router = createBrowserRouter([
  {
    path: "/",
    element: <DashBoard />,
    loader: dashBoardLoader,
  },
]);

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
