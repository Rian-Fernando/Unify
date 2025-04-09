import React, { useState, useEffect } from "react";
import { doc, updateDoc, arrayUnion, onSnapshot } from "firebase/firestore";
import { db } from "../services/firebase";
import { useAuth } from "../AuthContext";
import { MapPinIcon, ClockIcon, UserGroupIcon } from "@heroicons/react/24/solid";

const EventCard = ({ event }) => {
  const { user } = useAuth();
  const [attendees, setAttendees] = useState(event.rsvps || []);

  // Handle Firestore Timestamp
  const eventDate = new Date(event.time?.toDate ? event.time.toDate() : event.time);
  const formattedDate = eventDate.toLocaleDateString(undefined, {
    weekday: "short",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });

  useEffect(() => {
    const unsub = onSnapshot(doc(db, "events", event.id), (docSnap) => {
      if (docSnap.exists()) {
        setAttendees(docSnap.data().rsvps || []);
      }
    });
    return () => unsub();
  }, [event.id]);

  const alreadyJoined = attendees.includes(user?.email);

  const handleJoin = async () => {
    if (!user || alreadyJoined) return;

    try {
      const eventRef = doc(db, "events", event.id);
      await updateDoc(eventRef, {
        rsvps: arrayUnion(user.email),
      });
    } catch (err) {
      console.error("RSVP failed:", err);
      alert("Something went wrong trying to RSVP.");
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-md p-5 mb-4 w-full max-w-md transition hover:shadow-xl">
      <h2 className="text-lg font-bold text-indigo-700 mb-1">🎉 {event.title}</h2>
      <p className="text-sm text-gray-600 flex items-center gap-1 mb-1">
        <MapPinIcon className="w-4 h-4 text-red-500" />
        {event.location}
      </p>
      <p className="text-sm text-gray-700 mb-2">{event.description}</p>

      <div className="flex justify-between text-sm text-gray-500 items-center mb-3">
        <p className="flex items-center gap-1">
          <ClockIcon className="w-4 h-4" />
          {formattedDate}
        </p>
        <p className="flex items-center gap-1">
          <UserGroupIcon className="w-4 h-4" />
          RSVPs: {attendees.length}
        </p>
      </div>

      {user && (
        alreadyJoined ? (
          <p className="text-green-600 text-sm font-semibold">✅ You've RSVP’d</p>
        ) : (
          <button
            onClick={handleJoin}
            className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700"
          >
            RSVP
          </button>
        )
      )}
    </div>
  );
};

export default EventCard;