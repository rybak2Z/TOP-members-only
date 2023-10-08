import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SignUpPage from "./SignUpPage";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <SignUpPage />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
