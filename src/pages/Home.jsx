import EventCard from "../components/EventCard";

const Home = () => {
  const sampleEvents = [
    {
      title: "Chill & Study at Library",
      time: "3:00 PM - 4:30 PM",
      tags: ["study", "quiet", "group"],
      host: "Sarah L.",
    },
    {
      title: "Gym Session 🔥",
      time: "6:00 PM - 7:00 PM",
      tags: ["workout", "fitness"],
      host: "Rian F.",
    },
    {
      title: "Evening Walk @ Garden",
      time: "7:30 PM",
      tags: ["chill", "mentalbreak"],
      host: "Jay S.",
    },
  ];

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">🎓 Unify - Event Feed</h1>
      <div className="space-y-4">
        {sampleEvents.map((event, index) => (
          <EventCard
            key={index}
            title={event.title}
            time={event.time}
            tags={event.tags}
            host={event.host}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;