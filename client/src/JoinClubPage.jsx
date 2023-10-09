import { useState } from "react";
import { Navigate } from "react-router-dom";
import ErrorList from "./ErrorList";

function JoinClubPage() {
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState([]);

  function handleSubmit(event) {
    event.preventDefault(event);

    const url = event.target.action;
    const method = event.target.method;

    fetch(url, {
      method: method,
      body: new URLSearchParams(new FormData(event.target)),
    })
      .then((response) => {
        if (!response.ok && response.status !== 401) {
          throw new Error(`Unrecognized error: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        if (data.success) {
          setSuccess(true);
          alert("Your new account status: " + data.accountStatus);
        } else {
          setSuccess(false);
          setErrors([data.errorMessage]);
        }
      })
      .catch((err) => {
        // TODO
        console.log(`err:`, err);
      });
  }

  return success ? (
    <Navigate to="/" />
  ) : (
    <>
      <form
        method="POST"
        action="api/join-club"
        onSubmit={(event) => handleSubmit(event)}
      >
        <label for="passcode">Secret passcode</label>
        <input type="text" name="passcode" id="passcode" />
        <button type="submit">Submit</button>
      </form>
      <ErrorList errors={errors} />
    </>
  );
}

export default JoinClubPage;
