import { useState } from "react";
import { Link } from "react-router-dom";

function MainPage() {
  const [username, setUsername] = useState(null);

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
        const usernameInput = document.querySelector("#username");
        setUsername(usernameInput.value);
      })
      .catch((err) => {
        // TODO
        console.log(`err:`, err);
      });
  }

  if (!username) {
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
      <h1>Welcome, {username}!</h1>
      <a href="api/log-out">Log out</a>
      <Link to="join-club">Become a club member</Link>
    </>
  );
}

export default MainPage;
