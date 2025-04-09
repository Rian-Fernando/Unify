import React from "react";

const EventCard = ({ event }) => {
  const { title, description, time, location, rsvps } = event;

  const formattedTime = new Date(time).toLocaleString("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  });

  return (
    <div className="bg-white shadow-md rounded-2xl p-6 transition-transform hover:scale-[1.015] hover:shadow-lg border border-gray-100">
      <h2 className="text-xl font-semibold text-blue-700 mb-1">{title}</h2>
      <p className="text-gray-600 text-sm mb-2">
        📍 {location}
      </p>
      <p className="text-gray-500 mb-3">{description}</p>
      <div className="flex justify-between items-center text-sm text-gray-500">
        <p>🕒 {formattedTime}</p>
        <p>👥 RSVPs: {rsvps?.length || 0}</p>
      </div>
    </div>
  );
};

export default EventCard;