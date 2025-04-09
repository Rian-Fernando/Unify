import { useState, useEffect } from "react";
import { doc, updateDoc, arrayUnion, onSnapshot } from "firebase/firestore";
import { db } from "../services/firebase";
import { useAuth } from "../AuthContext";
import EventChat from "./EventChat"; // 👈 Make sure this import is here

const EventCard = ({ title, time, tags, host, id }) => {
  const { user } = useAuth();
  const [attendees, setAttendees] = useState([]);
  const [capacity, setCapacity] = useState("Unlimited");

  // Listen to this event's Firestore doc in real time
  useEffect(() => {
    const unsub = onSnapshot(doc(db, "events", id), (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        setAttendees(data.attendees || []);
        setCapacity(data.capacity || "Unlimited");
      }
    });
    return () => unsub();
  }, [id]);

  const alreadyJoined = attendees.includes(user.email);
  const isFull =
    capacity !== "Unlimited" && attendees.length >= parseInt(capacity);

  const handleJoin = async () => {
    if (alreadyJoined || isFull) return;

    try {
      const eventRef = doc(db, "events", id);
      await updateDoc(eventRef, {
        attendees: arrayUnion(user.email),
      });
    } catch (err) {
      console.error("❌ RSVP failed:", err);
      alert("Error joining event.");
    }
  };

  return (
    <div className="bg-white rounded-xl shadow p-4 border border-gray-200">
      <h2 className="text-xl font-semibold text-blue-700">{title}</h2>
      <p className="text-sm text-gray-500">🕒 {time} — Hosted by {host}</p>

      <div className="flex flex-wrap gap-2 mt-2">
        {tags?.map((tag, i) => (
          <span
            key={i}
            className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full"
          >
            #{tag}
          </span>
        ))}
      </div>

      <div className="mt-3 text-sm">
        👥 {attendees.length} attending
        {capacity !== "Unlimited" && ` / ${capacity}`}
      </div>

      {!alreadyJoined && !isFull && (
        <button
          onClick={handleJoin}
          className="mt-2 bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700"
        >
          Join
        </button>
      )}

      {alreadyJoined && (
        <p className="mt-2 text-green-600 text-sm font-semibold">✅ Joined</p>
      )}

      {isFull && !alreadyJoined && (
        <p className="mt-2 text-red-500 text-sm font-semibold">⛔ Event Full</p>
      )}

      {/* 👇 Event Chat — Only visible if the user has joined */}
      {alreadyJoined && <EventChat eventId={id} />}
    </div>
  );
};

export default EventCard;