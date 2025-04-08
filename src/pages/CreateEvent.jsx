import { useState } from "react";

const CreateEvent = () => {
  const [title, setTitle] = useState("");
  const [time, setTime] = useState("");
  const [tags, setTags] = useState("");
  const [capacity, setCapacity] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const newEvent = {
      title,
      time,
      tags: tags.split(",").map(tag => tag.trim()),
      capacity: capacity || "Unlimited",
    };

    console.log("Event Created:", newEvent);

    // 🔜 Later we'll store this in Firebase!
    alert("Event created! (Check console for now)");

    setTitle("");
    setTime("");
    setTags("");
    setCapacity("");
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">📅 Create an Event</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Event Title"
          className="w-full p-2 border rounded"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Time (e.g. 6:00 PM)"
          className="w-full p-2 border rounded"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Tags (comma-separated, e.g. chill,study)"
          className="w-full p-2 border rounded"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
        />

        <input
          type="number"
          placeholder="Max Attendees (optional)"
          className="w-full p-2 border rounded"
          value={capacity}
          onChange={(e) => setCapacity(e.target.value)}
        />

        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Post Event
        </button>
      </form>
    </div>
  );
};

export default CreateEvent;