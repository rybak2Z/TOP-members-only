import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SignUpPage from "./SignUpPage";
import MainPage from "./MainPage";
import JoinClubPage from "./JoinClubPage";

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
    {
      path: "join-club",
      element: <JoinClubPage />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
