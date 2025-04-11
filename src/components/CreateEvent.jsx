import React from 'react';

const EventCard = ({ title, date, time, createdBy, createdAt, capacity, tags, description }) => {
  return (
    <div className="border p-4 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold">{title}</h3>
      <p className="text-gray-600">{createdBy} - {date.toDate().toLocaleDateString()} at {time}</p>
      <p className="text-gray-500">{description}</p>
      {capacity && <p className="text-gray-500">Max Attendees: {capacity}</p>}
      {Array.isArray(tags) && tags.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-2">
          {tags.map((tag, idx) => (
            <span
              key={idx}
              className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default EventCard;