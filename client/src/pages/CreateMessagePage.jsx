import { useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../App";
import useForm from "../hooks/useForm";
import ErrorList from "../components/ErrorList";
import BackButton from "../components/BackButton";

function CreateMessagePage() {
  const user = useContext(UserContext);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState([]);
  const handleSubmit = useForm(responseHandler);

  async function responseHandler(response) {
    if (response.ok) {
      setSuccess(true);
      setErrors([]);
      return;
    }
    const data = await response.json();
    const errors = data.errors.map((err) => err.msg);
    setErrors(errors);
  }

  return user === null || success ? (
    <Navigate to="/" />
  ) : (
    <>
      <BackButton />
      <h1>Create a new message</h1>
      <form method="POST" action="/api/message" onSubmit={handleSubmit}>
        <label for="message-text">Message</label>
        <textarea
          name="messageText"
          id="message-text"
          rows="7"
          cols="50"
        ></textarea>
        <button type="submit">Submit</button>
      </form>
      <ErrorList errors={errors} />
    </>
  );
}

export default CreateMessagePage;
