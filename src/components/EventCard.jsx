import React from "react";
import { Link } from "react-router-dom";

const EventCard = ({ event }) => {
  const {
    id,
    title,
    description,
    tags = [],
    maxAttendees,
    attendees = [],
    date,
  } = event;

  const eventDate = date?.seconds ? new Date(date.seconds * 1000) : date ? new Date(date) : null;
  const formattedDate = eventDate
    ? `${eventDate.toLocaleDateString()} at ${eventDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`
    : "Date not set";

  return (
    <div className="bg-white p-4 rounded shadow-md space-y-2">
      <h3 className="text-xl font-semibold text-blue-700">{title}</h3>
      <p className="text-gray-600">{description}</p>

      <div className="text-sm text-gray-500">
        📅 <strong>When:</strong> {formattedDate}
      </div>
      <div className="text-sm text-gray-500">
        👥 <strong>Attending:</strong> {attendees.length}/{maxAttendees || "∞"}
      </div>

      {Array.isArray(tags) && tags.length > 0 && (
        <div className="flex flex-wrap gap-1 text-xs text-white">
          {tags.map((tag, index) => (
            <span key={index} className="bg-blue-400 px-2 py-1 rounded">
              #{tag.trim()}
            </span>
          ))}
        </div>
      )}

      <Link
        to={`/event/${id}/chat`}
        className="block mt-2 text-blue-600 hover:underline"
      >
        💬 Join Chat
      </Link>
    </div>
  );
};

export default EventCard;