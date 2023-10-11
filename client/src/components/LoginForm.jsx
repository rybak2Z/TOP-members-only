import { Link } from "react-router-dom";
import { useState } from "react";
import useForm from "../hooks/useForm";
import ErrorList from "../components/ErrorList";

function LoginForm({ setUser }) {
  const [errors, setErrors] = useState([]);
  const handleSubmit = useForm(responseHandler);

  async function responseHandler(response) {
    if (response.status === 400 || response.status === 401) {
      setErrors(["Incorrect username or password."]);
      return;
    }
    if (!response.ok) {
      throw new Error(`Unrecognized error: ${response.status}`);
    }
    const data = await response.json();
    setUser(data); // { username, isMember, isAdmin }
    setErrors([]);
  }

  return (
    <>
      <form method="POST" action="/api/log-in" onSubmit={handleSubmit}>
        <label htmlFor="username">Username</label>
        <input type="text" name="username" id="username" />
        <label htmlFor="password">Password</label>
        <input type="text" name="password" id="password" />
        <button type="submit">Submit</button>
      </form>
      <ErrorList errors={errors} />
      <hr />
      <div className="flex">
        <span>Don't have an account?</span>
        <Link to="sign-up" className="thin-padding">
          Sign up
        </Link>
      </div>
    </>
  );
}

export default LoginForm;
