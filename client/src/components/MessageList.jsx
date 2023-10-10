import { useState, useEffect } from "react";
import Message from "./Message";

function MessageList() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    let ignore = false;
    fetch("/api/messages")
      .then((response) => {
        if (ignore) {
          return;
        }
        if (!response.ok) {
          throw new Error("HTTP error:", response.status);
        }
        return response.json();
      })
      .then((data) => {
        setMessages(data.messages);
      });

    return () => {
      ignore = true;
    };
  }, []);

  function handleDeleteMessage(indexToDelete, id) {
    const newMessages = [...messages];
    fetch("/api/message/" + id, { method: "DELETE" })
      .then((response) => {
        if (response.ok) {
          newMessages.splice(indexToDelete, 1);
          setMessages(newMessages);
        }
      })
      .catch((err) => {
        // TODO
        console.log(err);
      });
  }

  const messageElements = messages.map((message, idx) => {
    return (
      <Message
        text={message.text}
        username={message.user?.username}
        date={message.date}
        onDelete={() => handleDeleteMessage(idx, message._id)}
        key={idx}
      />
    );
  });

  return (
    <ul class="message-list">
      {messageElements.length > 0 ? messageElements : "There are no messages"}
    </ul>
  );
}

export default MessageList;
