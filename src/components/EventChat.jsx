import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { collection, addDoc, onSnapshot, serverTimestamp } from "firebase/firestore";
import { db, auth } from "../services/firebase";
import { onAuthStateChanged } from "firebase/auth";

const EventChat = () => {
  const { eventId } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [user, setUser] = useState(null);

  // Listen for user authentication status
  useEffect(() => {
    const unsubAuth = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    // Get messages from Firestore for the specific event
    const unsubMessages = onSnapshot(
      collection(db, "events", eventId, "messages"),
      (snapshot) => {
        const msgs = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
          // Removed timestamp logic
        }));
        setMessages(msgs);
      });

    return () => {
      unsubAuth();
      unsubMessages();
    };
  }, [eventId]);

  // Handle sending a message
  const handleSendMessage = async () => {
    if (!newMessage.trim() || !user) return;

    await addDoc(collection(db, "events", eventId, "messages"), {
      text: newMessage,
      sender: user.email,
      timestamp: serverTimestamp(),
    });

    setNewMessage(""); // Reset the message input after sending
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">💬 Event Chat</h2>

      <div className="border p-4 rounded h-96 overflow-y-auto bg-white shadow">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`mb-3 p-2 rounded ${
              msg.sender === user?.email
                ? "bg-blue-100 text-right ml-20"
                : "bg-gray-100 mr-20"
            }`}
          >
            <p className="text-sm font-semibold">{msg.sender}</p>
            <p>{msg.text}</p>
            <p className="text-xs text-gray-400 mt-1">
              {msg.timestamp?.seconds
                ? new Date(msg.timestamp.seconds * 1000).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })
                : ""}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-4 flex">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="flex-grow border p-2 rounded-l focus:outline-none"
          placeholder="Type a message..."
        />
        <button
          onClick={handleSendMessage}
          className="bg-blue-500 text-white px-4 rounded-r hover:bg-blue-600"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default EventChat;