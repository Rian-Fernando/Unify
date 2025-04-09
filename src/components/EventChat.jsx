import { useEffect, useState } from "react";
import { collection, addDoc, query, orderBy, onSnapshot, serverTimestamp } from "firebase/firestore";
import { db } from "../services/firebase";
import { useAuth } from "../AuthContext";

const EventChat = ({ eventId }) => {
  const { user } = useAuth();
  const [messages, setMessages] = useState([]);
  const [newMsg, setNewMsg] = useState("");

  useEffect(() => {
    const q = query(
      collection(db, "events", eventId, "messages"),
      orderBy("timestamp", "asc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetched = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setMessages(fetched);
    });

    return () => unsubscribe();
  }, [eventId]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!newMsg.trim()) return;

    try {
      await addDoc(collection(db, "events", eventId, "messages"), {
        sender: user.email,
        text: newMsg,
        timestamp: serverTimestamp(),
      });
      setNewMsg("");
    } catch (err) {
      console.error("❌ Error sending message:", err);
    }
  };

  return (
    <div className="mt-4 border-t pt-4">
      <h3 className="text-lg font-semibold mb-2">💬 Event Chat</h3>

      <div className="max-h-40 overflow-y-auto space-y-2 mb-3">
        {messages.map(msg => (
          <div key={msg.id} className="text-sm">
            <span className="font-medium text-blue-700">{msg.sender}</span>: {msg.text}
          </div>
        ))}
      </div>

      <form onSubmit={handleSend} className="flex gap-2">
        <input
          type="text"
          value={newMsg}
          onChange={(e) => setNewMsg(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 px-2 py-1 border rounded"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default EventChat;