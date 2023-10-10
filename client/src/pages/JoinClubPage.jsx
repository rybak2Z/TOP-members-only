import { useState } from "react";
import ErrorList from "../components/ErrorList";
import Modal from "../components/Modal";

function JoinClubPage() {
  const [successMessage, setSuccessMessage] = useState("");
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
          const statusArticle = data.accountStatus === "admin" ? "an" : "a";
          setSuccessMessage(
            `You are now ${statusArticle} ${data.accountStatus}!`,
          );
        } else {
          setSuccessMessage("");
          setErrors([data.errorMessage]);
        }
      })
      .catch((err) => {
        // TODO
        console.log(`err:`, err);
      });
  }

  return (
    <>
      {successMessage && (
        <Modal message={successMessage} onClose={() => setSuccessMessage("")} />
      )}
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
