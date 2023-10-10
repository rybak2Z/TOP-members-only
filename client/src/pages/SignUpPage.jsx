import { Navigate } from "react-router-dom";
import { useState } from "react";
import useForm from "../hooks/useForm";
import ErrorList from "../components/ErrorList";
import BackButton from "../components/BackButton";

function SignUpPage() {
  const [signedUp, setSignedUp] = useState(false);
  const [errors, setErrors] = useState([]);
  const handleSubmit = useForm(responseHandler);

  async function responseHandler(response) {
    if (response.status === 400) {
      const data = await response.json();
      const errors = data.errors.map((err) => err.msg);
      setErrors(errors);
    } else if (!response.ok) {
      throw new Error(`Unrecognized error: ${response.status}`);
    } else {
      setSignedUp(true);
    }
  }

  return signedUp ? (
    <Navigate to="/" />
  ) : (
    <>
      <BackButton />
      <form method="POST" action="/api/sign-up" onSubmit={handleSubmit}>
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
