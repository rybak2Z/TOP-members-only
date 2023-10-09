function ErrorList({ errors }) {
  const errorElements = errors.map((err, idx) => <li key={idx}>{err}</li>);

  return <>{errors.length > 0 && errorElements}</>;
}

export default ErrorList;
