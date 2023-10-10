import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../App";
import MessageList from "../components/MessageList";
import ErrorList from "../components/ErrorList";

function MainPage({ setUser }) {
  const user = useContext(UserContext);
  const [errors, setErrors] = useState([]);

  async function handleSubmit(event) {
    event.preventDefault();

    const url = event.target.action;
    const method = event.target.method;

    try {
      const response = await fetch(url, {
        method: method,
        body: new URLSearchParams(new FormData(event.target)),
      });

      if (response.status === 400 || response.status === 401) {
        setErrors(["Incorrect username or password."]);
        return;
      }
      if (!response.ok) {
        throw new Error(`Unrecognized error: ${response.status}`);
      }

      const data = await response.json();
      setUser(data); // { username, isMember, isAdmin }
      setErrors([]);
    } catch (err) {
      // TODO
      console.log(`err:`, err);
    }
  }

  if (user === null) {
    return (
      <>
        <form
          method="POST"
          action="/api/log-in"
          onSubmit={(event) => handleSubmit(event)}
        >
          <label for="username">Username</label>
          <input type="text" name="username" id="username" />
          <label for="password">Password</label>
          <input type="text" name="password" id="password" />
          <button type="submit">Submit</button>
        </form>
        <ErrorList errors={errors} />
        <hr />
        <div class="flex">
          <span>Don't have an account?</span>
          <Link to="sign-up" class="thin-padding">
            Sign up
          </Link>
        </div>
      </>
    );
  }

  const accountStatus = user.isAdmin
    ? "Admin"
    : user.isMember
    ? "Club Member"
    : "Regular Member";
  return (
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
