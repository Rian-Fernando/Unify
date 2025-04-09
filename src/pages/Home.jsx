import { useEffect, useState } from "react";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../services/firebase";
import EventCard from "../components/EventCard";

const Home = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "events"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetched = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setEvents(fetched);
    });

    return () => unsubscribe(); // cleanup
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">🎓 Unify - Event Feed</h1>

      {events.length === 0 ? (
        <p className="text-gray-500">No events yet... 👀</p>
      ) : (
        <div className="space-y-4">
          {events.map(event => (
            <EventCard
              key={event.id}
              title={event.title}
              time={event.time}
              tags={event.tags}
              host={event.createdBy}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;