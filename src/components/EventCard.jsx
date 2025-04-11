import React from "react";

export const EventDetails = ({ event }) => {
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

  return (
    <div>
      <p className="text-sm text-gray-500">{formattedDate} at {formattedTime}</p>
    </div>
  );
};

export default EventDetails;