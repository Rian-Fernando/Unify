import React, { useState } from "react";
import { addDoc } from "firebase/firestore";

const CreateEvent = ({ eventsCollection, user }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const [capacity, setCapacity] = useState("");
  const [datetime, setDatetime] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const dateObject = new Date(datetime);

    await addDoc(eventsCollection, {
      title,
      description,
      tags: tags.split(",").map((tag) => tag.trim()),
      capacity: parseInt(capacity) || null,
      attendees: [],
      createdBy: user.email,
      createdAt: new Date(),
      date: dateObject,
    });

    // Clear form fields after submission
    setTitle("");
    setDescription("");
    setTags("");
    setCapacity("");
    setDatetime("");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        placeholder="Event Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        className="w-full p-2 border rounded"
      />
      <textarea
        placeholder="Event Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
        className="w-full p-2 border rounded"
      />
      <input
        type="text"
        placeholder="Tags (comma separated)"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
        className="w-full p-2 border rounded"
      />
      <input
        type="number"
        placeholder="Max Attendees"
        value={capacity}
        onChange={(e) => setCapacity(e.target.value)}
        className="w-full p-2 border rounded"
      />
      <input
        type="datetime-local"
        className="w-full p-2 border rounded"
        value={datetime}
        onChange={(e) => setDatetime(e.target.value)}
        required
      />
      <button type="submit" className="bg-blue-500 text-white p-2 rounded">
        Create Event
      </button>
    </form>
  );
};

export default CreateEvent;