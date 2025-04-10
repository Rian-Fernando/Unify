import React, { useState } from 'react';
import { addDoc, collection, Timestamp } from 'firebase/firestore';
import { db } from '../services/firebase';
import { useAuth } from '../contexts/AuthContext';

const CreateEvent = () => {
  const { user } = useAuth();

  const [title, setTitle] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [eventTime, setEventTime] = useState('');
  const [description, setDescription] = useState('');
  const [capacity, setCapacity] = useState('');
  const [tags, setTags] = useState('');
  const [loading, setLoading] = useState(false);
  const [popup, setPopup] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const dateObj = new Date(`${eventDate}T${eventTime}`);
      const eventData = {
        title,
        date: Timestamp.fromDate(dateObj),
        time: dateObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        createdBy: user.email,
        createdAt: Timestamp.now(),
        capacity,
        tags: tags.split(',').map(tag => tag.trim()),
        description,
      };

      await addDoc(collection(db, 'events'), eventData);
      setPopup('Event created successfully!');
      setTitle('');
      setEventDate('');
      setEventTime('');
      setDescription('');
      setCapacity('');
      setTags('');
    } catch (err) {
      console.error('Error creating event:', err);
      setPopup('Error creating event.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">📅 Create an Event</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Event Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <div className="flex gap-2">
          <input
            type="date"
            value={eventDate}
            onChange={(e) => setEventDate(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="time"
            value={eventTime}
            onChange={(e) => setEventTime(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <textarea
          placeholder="Event Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 border rounded"
          rows={3}
        />
        <input
          type="text"
          placeholder="Tags (comma-separated, e.g. chill,study)"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <input
          type="number"
          placeholder="Max Attendees (optional)"
          value={capacity}
          onChange={(e) => setCapacity(e.target.value)}
          className="w-full p-2 border rounded"
        />

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
          disabled={loading}
        >
          {loading ? 'Posting...' : 'Post Event'}
        </button>
      </form>

      {popup && (
        <div className="mt-4 p-3 bg-white border rounded shadow">
          {popup}{' '}
          <button onClick={() => setPopup('')} className="text-blue-600 underline ml-2">
            Close
          </button>
        </div>
      )}
    </div>
  );
};

export default CreateEvent;