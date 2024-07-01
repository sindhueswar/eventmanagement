import { useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { updateEvent } from "../../controllers/eventsController";
import { EventContext } from "../../contexts/EventContext";
import Alert from "../../Components/Alert";

const Update = () => {

  const { events, setEvents } = useContext(EventContext);


  const navigate = useNavigate();

  const { state } = useLocation();

  const [error, setError] = useState(null);

  const [name, setName] = useState(state.name);
  const [date, setDate] = useState(state.date);

  const handleUpdate = async (e) => {
    e.preventDefault();
    console.log("handleUpdate",state._id,name,date)
    try {     
     
      const data = await updateEvent(state._id, name, date);
      
      const updatedEvents = events.filter((event) => event._id !== state._id);
   
      setEvents([...updatedEvents, data.event]);

      navigate("/dashboard");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <section className="card">
      <h1 className="name">Update your event</h1>

      <form onSubmit={handleUpdate}>
        <input
          type="text"
          placeholder="Event Name"
          className="input"
          value={name}
          onChange={(e) => setName(e.target.value)}
          autoFocus
        />
        <input
    
          placeholder="Event Content"
          className="input"
          type = "date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <button className="btn">Update</button>
      </form>

      {error && <Alert msg={error} />}
    </section>
  );
};

export default Update;
