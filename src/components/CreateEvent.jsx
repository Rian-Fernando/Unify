import React, { useState } from "react";
import { db } from "../services/firebase"; // Firebase DB service
import { collection, addDoc } from "firebase/firestore";

const CreateEvent = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [error, setError] = useState("");

  const handleCreateEvent = async (e) => {
    e.preventDefault();
    if (!title || !description || !location) {
      setError("All fields are required!");
      return;
    }

    try {
      await addDoc(collection(db, "events"), {
        title,
        description,
        location,
        createdAt: new Date(), // Optionally you can add this for a "created" timestamp if needed
      });

      setTitle("");
      setDescription("");
      setLocation("");
      setError("");
      alert("Event created successfully!");
    } catch (err) {
      setError("Error creating event. Please try again.");
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Create a New Event</h2>

      {error && <p className="text-red-500">{error}</p>}

      <form onSubmit={handleCreateEvent} className="space-y-4">
        <div>
          <label className="block text-sm font-semibold">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border p-2 rounded w-full"
            placeholder="Event Title"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border p-2 rounded w-full"
            placeholder="Event Description"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold">Location</label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="border p-2 rounded w-full"
            placeholder="Event Location"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Create Event
        </button>
      </form>
    </div>
  );
};

export default CreateEvent;