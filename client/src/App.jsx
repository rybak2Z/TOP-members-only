import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SignUpPage from "./SignUpPage";
import MainPage from "./MainPage";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <MainPage />,
    },
    {
      path: "/sign-up",
      element: <SignUpPage />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
