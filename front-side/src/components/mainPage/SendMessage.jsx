import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useActRelationContext } from "./MessageContainer";
import axios from "axios";

export default function SendMessage() {
  const { userID } = useParams();
  const [relationID, updateRelationID] = useActRelationContext();
  const [message, setMessage] = useState("");

  const handleInputChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSendMessage = () => {
    if (message.trim() !== "") {
      axios
        .post("http://127.0.0.1:8080/handleSendMessage", {
          relationID: relationID,
          message: {
            userID: userID,
            text: message,
          },
        })
        .then(() => window.location.reload());

      setMessage("");
    }
  };

  return (
    <div className="flex items-end">
      <textarea
        rows="3"
        placeholder="Type your message..."
        value={message}
        onChange={handleInputChange}
        className="w-full p-2 mb-2"
      />
      <button
        className="bg-blue-500 text-white py-2 px-4 rounded-full text-4xl ml-2"
        onClick={handleSendMessage}
      >
        ➡️
      </button>
    </div>
  );
}
