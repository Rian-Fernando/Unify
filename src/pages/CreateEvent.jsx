import { useState } from "react";
import { db } from "../services/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { useAuth } from "../AuthContext";

const CreateEvent = () => {
  const [title, setTitle] = useState("");
  const [time, setTime] = useState(null);
  const [tags, setTags] = useState("");
  const [capacity, setCapacity] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !time) {
      alert("Title and time are required.");
      return;
    }

    setLoading(true);

    try {
      const eventData = {
        title,
        time: time ? time.toISOString() : "",
        description,
        tags: tags.split(",").map(tag => tag.trim()),
        capacity: capacity || "Unlimited",
        createdAt: serverTimestamp(),
        createdBy: user.email,
      };

      await addDoc(collection(db, "events"), eventData);

      alert("✅ Event created successfully!");
      setTitle("");
      setTime(null);
      setTags("");
      setCapacity("");
      setDescription("");
    } catch (err) {
      console.error("❌ Error creating event:", err);
      alert("Error creating event.");
    }

    setLoading(false);
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
          type="datetime-local"
          className="w-full p-2 border rounded"
          value={time ? new Date(time).toISOString().slice(0, 16) : ""}
          onChange={(e) => setTime(new Date(e.target.value))}
          required
        />

        <textarea
          placeholder="Event Description"
          className="w-full p-2 border rounded"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
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

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 rounded text-white ${
            loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {loading ? "Posting..." : "Post Event"}
        </button>
      </form>
    </div>
  );
};

export default CreateEvent;