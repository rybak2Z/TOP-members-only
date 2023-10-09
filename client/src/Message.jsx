function Message({ text, username, date }) {
  return (
    <>
      {username && (
        <h2>
          {username} ({date})
        </h2>
      )}
      <p>{text}</p>
      <hr />
    </>
  );
}

export default Message;
