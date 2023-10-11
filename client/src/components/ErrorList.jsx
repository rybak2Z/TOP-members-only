function ErrorList({ errors }) {
  const errorElements = errors.map((err, idx) => <li key={idx}>{err}</li>);
  const list = (
    <ul className="error-list">{errors.length > 0 && errorElements}</ul>
  );

  return errors.length > 0 ? list : null;
}

export default ErrorList;
