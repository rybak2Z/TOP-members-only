function SignUpPage() {
  return (
    <>
      <form method="POST" action="/api/sign-up">
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
