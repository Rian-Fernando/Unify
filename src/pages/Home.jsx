import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../services/firebase";
import EventCard from "../components/EventCard";

const Home = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchEvents = async () => {
    try {
      const snapshot = await getDocs(collection(db, "events"));
      const fetchedEvents = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setEvents(fetchedEvents);
    } catch (err) {
      console.error("Error fetching events:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-blue-800 mb-6">🎉 Upcoming Events</h1>

      {loading ? (
        <p className="text-center text-gray-500">Loading events...</p>
      ) : events.length === 0 ? (
        <p className="text-center text-gray-400">No events found. Check back later!</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {events.map(event => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;