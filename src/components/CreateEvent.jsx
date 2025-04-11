import React, { useState } from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../services/firebase";

const CreateEvent = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [tags, setTags] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "events"), {
        title,
        description,
        location,
        date: new Date(date),
        tags,
        createdAt: serverTimestamp(),
      });
      setTitle("");
      setDescription("");
      setLocation("");
      setDate("");
      setTags("");
      alert("Event created successfully!");
    } catch (err) {
      console.error("Error creating event:", err);
      alert("Failed to create event.");
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 border rounded shadow bg-white">
      <h2 className="text-2xl font-bold mb-4">🎯 Create an Event</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Event Title"
          className="w-full border p-2 rounded"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Description"
          className="w-full border p-2 rounded"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="text"
          placeholder="Location"
          className="w-full border p-2 rounded"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <input
          type="datetime-local"
          className="w-full border p-2 rounded"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Tags (comma-separated)"
          className="w-full border p-2 rounded"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Create Event
        </button>
      </form>
    </div>
  );
};

export default CreateEvent;