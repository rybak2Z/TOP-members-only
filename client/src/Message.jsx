import { useContext } from "react";
import { UserContext } from "./App";

function Message({ text, username, date, onDelete }) {
  const user = useContext(UserContext);

  return (
    <>
      {username && (
        <h2>
          {username} ({date})
        </h2>
      )}
      <p>{text}</p>
      {user.isAdmin && <button onClick={onDelete}>Delete</button>}
      <hr />
    </>
  );
}

export default Message;
