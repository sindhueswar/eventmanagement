import { useContext, useEffect, useState } from "react";
import { getEvents } from "../../controllers/eventsController";
import { EventContext } from "../../contexts/EventContext";
import Event from "../../Components/Event";

const Admin = () => {

  const { events, setEvents } = useContext(EventContext);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(async () => {

      const data = await getEvents();
 
      setEvents(data.events);

      setLoading(false);
    }, 1000);
  }, []);

  return (
    <section className="card max-w-lg">
    

      {loading && (
        <i className="fa-solid fa-spinner animate-spin text-3xl text-center block"></i>
      )}

      {events &&
        events.map((event) => (
          <div key={event._id}>
            <Event event={event} />
          </div>
        ))}
    </section>
  );
};

export default Admin;
