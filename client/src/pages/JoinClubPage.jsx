import { useState } from "react";
import useForm from "../hooks/useForm";
import ErrorList from "../components/ErrorList";
import Modal from "../components/Modal";
import BackButton from "../components/BackButton";

function JoinClubPage() {
  const [successMessage, setSuccessMessage] = useState("");
  const [errors, setErrors] = useState([]);
  const handleSubmit = useForm(responseHandler);

  async function responseHandler(response) {
    if (!response.ok && response.status !== 401) {
      throw new Error(`Unrecognized error: ${response.status}`);
    }
    const data = await response.json();
    if (data.success) {
      const statusArticle = data.accountStatus === "admin" ? "an" : "a";
      const message = data.isNewStatus
        ? `You are now ${statusArticle} ${data.accountStatus}!`
        : `You are already ${statusArticle} ${data.accountStatus}.`;
      setSuccessMessage(message);
    } else {
      setSuccessMessage("");
      setErrors([data.errorMessage]);
    }
  }

  return (
    <>
      <BackButton />
      {successMessage && (
        <Modal message={successMessage} onClose={() => setSuccessMessage("")} />
      )}
      <form method="POST" action="api/join-club" onSubmit={handleSubmit}>
        <label htmlFor="passcode">Secret passcode</label>
        <input type="text" name="passcode" id="passcode" />
        <button type="submit">Submit</button>
      </form>
      <ErrorList errors={errors} />
    </>
  );
}

export default JoinClubPage;
