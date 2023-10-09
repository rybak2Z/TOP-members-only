import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { createContext, useState } from "react";
import SignUpPage from "./SignUpPage";
import MainPage from "./MainPage";
import JoinClubPage from "./JoinClubPage";
import CreateMessagePage from "./CreateMessagePage";

export const UserContext = createContext(null);

function App() {
  const [user, setUser] = useState(null);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <MainPage setUser={setUser} />,
    },
    {
      path: "/sign-up",
      element: <SignUpPage />,
    },
    {
      path: "join-club",
      element: <JoinClubPage />,
    },
    {
      path: "create-message",
      element: <CreateMessagePage />,
    },
  ]);

  return (
    <>
      <UserContext.Provider value={user}>
        <RouterProvider router={router} />
      </UserContext.Provider>
    </>
  );
}

export default App;
