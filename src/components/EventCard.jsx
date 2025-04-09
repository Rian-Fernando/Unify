const EventCard = ({ title, time, tags, host }) => {
  return (
    <div className="bg-white rounded-xl shadow p-4 border border-gray-200">
      <h2 className="text-xl font-semibold text-blue-700">{title}</h2>
      <p className="text-sm text-gray-500">🕒 {time} — Hosted by {host}</p>
      <div className="flex flex-wrap gap-2 mt-2">
        {tags?.map((tag, i) => (
          <span
            key={i}
            className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full"
          >
            #{tag}
          </span>
        ))}
      </div>
    </div>
  );
};

export default EventCard;