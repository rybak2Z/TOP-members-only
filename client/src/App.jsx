import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ExamplePage from "./ExamplePage";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <ExamplePage />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
