import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { UserContext } from "../../contexts/UserContext";
import { deleteEvent, getUserEvents } from "../../controllers/eventsController";
import Event from "../../Components/Event";
import Alert from "../../Components/Alert";
import Success from "../../Components/Success";

const Dashboard = () => {

  const { user, setUser } = useContext(UserContext);

 
  const [loading, setLoading] = useState(true);


  const [error, setError] = useState(null);

  
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    setTimeout(async () => {

      const { userEvents, email } = await getUserEvents();

      setUser({ email, events: userEvents });
     
      setLoading(false);
    }, 500);
  }, []);


  const handleDelete = async (_id) => {
    if (confirm("Confirm delete?")) {
      try {
      
        const data = await deleteEvent(_id);
     
        setSuccess(data.success);
      } catch (error) {
        setError(error.message);
      }

      const newEvents = user.events.filter((event) => event._id !== _id);
      setUser({ ...user, events: newEvents });
    }
  };
  return (
    <section className="card">
      
      <h3>{user.email}</h3>
      {loading && (
        <i className="fa-solid fa-spinner animate-spin text-3xl text-center block"></i>
      )}
      {success && <Success msg={success} />}
      {error && <Alert msg={error} />}

      {user.events &&
        user.events.map((event) => (
          <div key={event._id}>
            <Event event={event}>
              <div className="flex items-center gap-2">
                <Link
                  className="fa-solid fa-pen-to-square nav-link text-green-500 hover:bg-green-200"
                  name="Update"
                  state={event}
                  to="/update"
                ></Link>
                <button
                  className="fa-solid fa-trash-can nav-link text-red-500 hover:bg-red-200"
                  name="Delete"
                  onClick={() => handleDelete(event._id)}
                ></button>
              </div>
            </Event>
          </div>
        ))}
    </section>
  );
};

export default Dashboard;
