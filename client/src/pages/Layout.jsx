import { useContext } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";

import { UserContext } from "../contexts/UserContext";

const Layout = () => {
  // Use navigate hook
  const navigate = useNavigate();

  // Grab the User global state
  const { user, setUser } = useContext(UserContext);

  // Handle logout
  const handleLogout = () => {
    if (confirm("Confirm Logout?")) {
      // Reset the User state
      setUser({ email: null, events: [] });
      // Remove the items from local storage
      localStorage.removeItem("email");
      localStorage.removeItem("token");
      // Navigate to Admin page
      navigate("/");
    }
  };

  return (
    <>
      <header className="bg-indigo-500 text-white">
        <nav className="flex items-center justify-between p-4 max-w-screen-lg mx-auto">
          {user.email ? (
            <Link title="Admin" to="/">
              <h1 className="title">User DashBoard</h1>
            </Link>
          ) : (
            <Link title="Admin" to="/">
              <h1 className="title">Admin Panel</h1>
            </Link>
          )}
          {user.email ? (
            <div className="flex items-center gap-2">
              <Link
                title="Create Event"
                to="/create"
                className="fa-solid fa-circle-plus nav-link"
              ></Link>
              <Link
                title="Admin Panel"
                to="/"
                className="fa-solid fa-circle-user nav-link"
              ></Link>
              <button
                title="Logout"
                onClick={handleLogout}
                className="fa-solid fa-right-from-bracket nav-link"
              ></button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                title="Login"
                to="/login"
                className="fa-solid fa-right-to-bracket nav-link"
              ></Link>
              <Link
                title="Register"
                to="/register"
                className="fa-solid fa-user-plus nav-link"
              ></Link>
            </div>
          )}
        </nav>
      </header>

      <main className="p-4">
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
