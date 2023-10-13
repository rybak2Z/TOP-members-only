import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../App";
import useApi from "../hooks/useApi";
import MessageList from "../components/MessageList";
import LoginForm from "../components/LoginForm";

function MainPage({ setUser }) {
  const user = useContext(UserContext);
  const navigate = useNavigate();

  let accountStatus;
  if (user?.isAdmin) {
    accountStatus = "Admin";
  } else if (user?.isMember) {
    accountStatus = "Club Member";
  } else {
    accountStatus = "Regular Member";
  }

  async function logOut() {
    try {
      const response = await fetch(useApi("/api/log-out"), {
        method: "POST",
        credentials: "include",
      });
      if (!response.ok) {
        throw new Error("HTTP error:", response.status);
      }
      navigate(0); // Reload page
    } catch (err) {
      // TODO
      console.log(err);
    }
  }

  return user === null ? (
    <LoginForm setUser={setUser} />
  ) : (
    <>
      <h1 style={{ marginBottom: 0 }}>Welcome, {user.username}!</h1>
      <h2>Your status: {accountStatus}</h2>
      <div className="button-list">
        <Link to="join-club" className="thin-padding">
          Become a club member
        </Link>
        <Link
          to={
            "" /* No renavigation because it is handled in the click handler */
          }
          className="thin-padding"
          onClick={logOut}
        >
          Log out
        </Link>
      </div>
      <hr />
      <Link to="create-message" id="new-message-button">
        Create a new message
      </Link>
      <MessageList />
    </>
  );
}

export default MainPage;
