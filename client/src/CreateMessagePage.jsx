import { useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "./App";

function CreateMessagePage() {
  const user = useContext(UserContext);
  const [success, setSuccess] = useState(false);

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
        setSuccess(true);
      })
      .catch((err) => {
        // TODO
        console.log(`err:`, err);
      });
  }

  if (user === null || success) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <h1>Create a new message</h1>
      <form
        method="POST"
        action="/api/create-message"
        onSubmit={(event) => handleSubmit(event)}
      >
        <label for="message-text">Message:</label>
        <textarea
          name="messageText"
          id="message-text"
          rows="5"
          cols="30"
        ></textarea>
        <button type="submit">Submit</button>
      </form>
    </>
  );
}

export default CreateMessagePage;
