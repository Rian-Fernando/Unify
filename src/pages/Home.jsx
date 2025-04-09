import React, { useState, useEffect } from "react"; 
// We import useState and useEffect to manage state and side effects.

import { collection, getDocs } from "firebase/firestore";
// Import Firestore functions to fetch documents.

import { db } from "../services/firebase";
// Import your Firestore database configuration from firebase.js.

import EventCard from "../components/EventCard";
// Import the EventCard component to display each event.

const Home = () => {
  // Declare state for the list of events.
  const [events, setEvents] = useState([]);
  // State to track if we're still loading the events.
  const [loading, setLoading] = useState(true);

  // Define a function to fetch events from Firestore.
  const fetchEvents = async () => {
    try {
      // Fetch all documents in the "events" collection.
      const snapshot = await getDocs(collection(db, "events"));
      
      // Map each document to extract its id and data.
      const fetchedEvents = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      
      // Update the events state with the fetched data.
      setEvents(fetchedEvents);
    } catch (err) {
      console.error("Error fetching events:", err);
    } finally {
      // Once done (whether successful or failed), mark loading as false.
      setLoading(false);
    }
  };

  // useEffect to fetch events when the component mounts.
  useEffect(() => {
    fetchEvents();
  }, []); // Empty dependency array ensures this runs once when the component mounts.

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Page heading */}
      <h1 className="text-3xl font-bold text-blue-800 mb-6">
        🎉 Upcoming Events
      </h1>

      {/* Conditional Rendering */}
      {loading ? (
        // Display a loading message if events are still being fetched.
        <p className="text-center text-gray-500">Loading events...</p>
      ) : events.length === 0 ? (
        // If no events found, display a friendly message.
        <p className="text-center text-gray-400">
          No events found. Check back later!
        </p>
      ) : (
        // Otherwise, display the events in a grid.
        <div className="grid md:grid-cols-2 gap-6">
          {events.map((event) => (
            // For each event, render an EventCard component.
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;