import React from 'react';

const EventCard = ({ event }) => {
  const eventDate = event.date instanceof Date
    ? event.date
    : event.date?.toDate?.() || new Date(event.date);

  const formattedDate = eventDate instanceof Date && !isNaN(eventDate)
    ? eventDate.toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })
    : "No date available";

  const formattedTime = eventDate instanceof Date && !isNaN(eventDate)
    ? eventDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    : "No time";

  return (
    <div className="event-card">
      <h2>{event.title}</h2>
      <p>{formattedDate}</p>
      <p>{formattedTime}</p>
      {/* Other event details */}
    </div>
  );
};

export default EventCard;