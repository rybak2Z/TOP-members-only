import { Navigate } from "react-router-dom";
import { useState } from "react";

function SignUpPage() {
  const [signedUp, setSignedUp] = useState(false);

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
        console.log("successfully signed up");
        setSignedUp(true);
      })
      .catch((err) => {
        // TODO
        console.log(`err:`, err);
      });
  }

  return signedUp ? (
    <Navigate to="/" />
  ) : (
    <>
      <form
        method="POST"
        action="/api/sign-up"
        onSubmit={(event) => handleSubmit(event)}
      >
        <label for="username">Username: </label>
        <input type="text" name="username" id="username" />
        <label for="password">Password: </label>
        <input type="text" name="password" id="password" />
        <label for="confirm-password">Confirm password: </label>
        <input type="text" name="confirmPassword" id="confirm-password" />
        <button type="submit">Submit</button>
      </form>
    </>
  );
}

export default SignUpPage;
