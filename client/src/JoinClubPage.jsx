import { useState } from "react";
import { Navigate } from "react-router-dom";

function JoinClubPage() {
  const [success, setSuccess] = useState(false);

  function handleSubmit(event) {
    event.preventDefault(event);

    const url = event.target.action;
    const method = event.target.method;

    fetch(url, {
      method: method,
      body: new URLSearchParams(new FormData(event.target)),
    })
      .then((response) => {
        if (!response.ok) {
          console.log(response);
          throw new Error(`HTTP error, status: ${response.status}`);
        }
        if (response.status === 200) {
          console.log(response.status);
          console.log("you are a member");
          setSuccess(true);
        } else {
          console.log("something else happened");
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
    </>
  );
}

export default JoinClubPage;
