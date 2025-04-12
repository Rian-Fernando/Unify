import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../services/firebase";
import EventCard from "../components/EventCard";
import { useAuth } from "../AuthContext";

const Home = () => {
  const { currentUser } = useAuth();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchEvents = async () => {
    try {
      const snapshot = await getDocs(collection(db, "events"));
      const fetchedEvents = snapshot.docs.map((doc) => ({
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

  if (!currentUser) {
    return (
      <div className="text-center p-10 max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold text-blue-800 mb-4">Welcome to Unify 🎓</h1>
        <p className="text-lg text-gray-600">
          Join your university community. Discover events, meet people, and stay connected. Log in to get started.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <div className="mb-10 text-center">
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">Upcoming Events</h2>
        <p className="text-gray-500">Discover what's happening on campus</p>
      </div>
      {loading ? (
        <p className="text-center text-gray-500">Loading events...</p>
      ) : events.length === 0 ? (
        <p className="text-center text-gray-400">No events found. Check back later!</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {events.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;