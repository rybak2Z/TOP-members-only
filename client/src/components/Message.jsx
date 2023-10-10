import { useContext } from "react";
import { UserContext } from "../App";

function Message({ text, username, date, onDelete }) {
  const user = useContext(UserContext);

  const formattedDate = date ? new Date(date).toLocaleString() : null;

  return (
    <li class="message">
      <h1>Author: {username ?? "(hidden for non club members)"}</h1>
      <h2>Date: {formattedDate ?? "(hidden for non club members)"}</h2>
      <p>{text}</p>
      {user.isAdmin && (
        <button class="thin-padding button-secondary" onClick={onDelete}>
          Delete
        </button>
      )}
    </li>
  );
}

export default Message;
