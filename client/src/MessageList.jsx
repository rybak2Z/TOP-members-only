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

  const messageElements = messages.map((message, idx) => {
    return (
      <Message
        text={message.text}
        username={message.user?.username}
        date={message.date}
        key={idx}
      />
    );
  });

  return (
    <>
      {messageElements.length > 0 ? messageElements : "There are no messages"}
    </>
  );
}

export default MessageList;
