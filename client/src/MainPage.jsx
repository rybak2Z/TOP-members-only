import { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "./App";

function MainPage({ setUser }) {
  const user = useContext(UserContext);

  function handleSubmit(event) {
    event.preventDefault();

    const url = event.target.action;
    const method = event.target.method;

    fetch(url, {
      method: method,
      body: new URLSearchParams(new FormData(event.target)),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error, status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setUser(data); // { username, isMember }
      })
      .catch((err) => {
        // TODO
        console.log(`err:`, err);
      });
  }

  if (user === null) {
    return (
      <>
        <form
          method="POST"
          action="/api/log-in"
          onSubmit={(event) => handleSubmit(event)}
        >
          <label for="username">Username: </label>
          <input type="text" name="username" id="username" />
          <label for="password">Password: </label>
          <input type="text" name="password" id="password" />
          <button type="submit">Submit</button>
        </form>
        <Link to="sign-up">Sign up</Link>
      </>
    );
  }

  return (
    <>
      <h1>Welcome, {user.username}!</h1>
      <a href="/api/log-out">Log out</a>
      <Link to="join-club">Become a club member</Link>
      <Link to="create-message">Create a new message</Link>
    </>
  );
}

export default MainPage;
