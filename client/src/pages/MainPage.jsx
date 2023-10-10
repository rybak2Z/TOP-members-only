import { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../App";
import MessageList from "../components/MessageList";
import LoginForm from "../components/LoginForm";

function MainPage({ setUser }) {
  const user = useContext(UserContext);

  let accountStatus;
  if (user?.isAdmin) {
    accountStatus = "Admin";
  } else if (user?.isMember) {
    accountStatus = "Club Member";
  } else {
    accountStatus = "Regular Member";
  }

  return user === null ? (
    <LoginForm setUser={setUser} />
  ) : (
    <>
      <h1 style={{ marginBottom: 0 }}>Welcome, {user.username}!</h1>
      <h2>Your status: {accountStatus}</h2>
      <div class="button-list">
        <Link to="join-club" class="thin-padding">
          Become a club member
        </Link>
        <a href="/api/log-out" class="thin-padding">
          Log out
        </a>
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
