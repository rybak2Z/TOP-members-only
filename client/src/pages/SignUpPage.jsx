import { Navigate } from "react-router-dom";
import { useState } from "react";
import ErrorList from "../components/ErrorList";
import BackButton from "../components/BackButton";

function SignUpPage() {
  const [signedUp, setSignedUp] = useState(false);
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

      if (response.status === 400) {
        const data = await response.json();
        const errors = data.errors.map((err) => err.msg);
        setErrors(errors);
      } else if (!response.ok) {
        throw new Error(`Unrecognized error: ${response.status}`);
      } else {
        setSignedUp(true);
      }
    } catch (err) {
      // TODO
      console.log(`err:`, err);
    }
  }

  return signedUp ? (
    <Navigate to="/" />
  ) : (
    <>
      <BackButton />
      <form
        method="POST"
        action="/api/sign-up"
        onSubmit={(event) => handleSubmit(event)}
      >
        <label for="username">Username</label>
        <input type="text" name="username" id="username" />
        <label for="password">Password</label>
        <input type="text" name="password" id="password" />
        <label for="confirm-password">Confirm password</label>
        <input type="text" name="confirmPassword" id="confirm-password" />
        <button type="submit">Submit</button>
      </form>
      <ErrorList errors={errors} />
    </>
  );
}

export default SignUpPage;
