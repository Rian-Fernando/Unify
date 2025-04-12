import React from "react";

const EventCard = ({ event }) => {
  const eventDate = event?.date?.toDate ? event.date.toDate() : new Date(event.date);
  const formattedDate = eventDate.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
  const formattedTime = eventDate.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  const tags = Array.isArray(event.tags)
    ? event.tags
    : typeof event.tags === "string"
    ? event.tags.split(",")
    : [];

  return (
    <div className="bg-white shadow-sm border border-gray-200 rounded-xl p-6 mb-6 transition hover:shadow-md">
      <h3 className="text-lg font-semibold text-gray-800 mb-1 tracking-tight">{event.title}</h3>
      <p className="text-gray-600 mb-3 leading-relaxed">{event.description}</p>
      <p className="text-sm text-gray-400 mb-2">
        {formattedDate} • {formattedTime}
      </p>
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-1 mt-1">
          {tags.map((tag, idx) => (
            <span
              key={idx}
              className="bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-medium px-2 py-0.5 rounded-full transition"
            >
              #{tag.trim()}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default EventCard;