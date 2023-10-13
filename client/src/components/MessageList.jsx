import { useState, useEffect } from "react";
import useApi from "../hooks/useApi";
import Message from "./Message";

function MessageList() {
  const [messages, setMessages] = useState([]);

  function sortMessagesByNewest(messages) {
    for (const message of messages) {
      message.date = new Date(message.date);
    }
    messages.sort((msgA, msgB) =>
      msgA.date.getTime() < msgB.date.getTime() ? 1 : -1,
    );
  }

  useEffect(() => {
    let ignore = false;

    async function fetchMessages() {
      try {
        const response = await fetch(useApi("/api/messages"), {
          credentials: "include",
        });
        if (ignore) {
          return;
        }
        if (!response.ok) {
          throw new Error("HTTP error:", response.status);
        }
        const data = await response.json();
        // If user can see the dates, sort the messages. Otherwise, the data
        // will have been sorted by the server
        if (data.messages[0].date !== undefined) {
          sortMessagesByNewest(data.messages);
        }
        setMessages(data.messages);
      } catch (error) {
        // TODO
        console.log(error);
      }
    }

    fetchMessages();

    return () => {
      ignore = true;
    };
  }, []);

  async function handleDeleteMessage(indexToDelete, id) {
    const newMessages = [...messages];
    try {
      const url = useApi("/api/messages/" + id);
      const response = await fetch(url, {
        method: "DELETE",
        credentials: "include",
      });
      if (response.ok) {
        newMessages.splice(indexToDelete, 1);
        setMessages(newMessages);
      }
    } catch (error) {
      // TODO
      console.log(error);
    }
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
    <ul className="message-list">
      {messageElements.length > 0 ? messageElements : "There are no messages"}
    </ul>
  );
}

export default MessageList;
