import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../controllers/usersController";
import { UserContext } from "../../contexts/UserContext";
import Alert from "../../Components/Alert";


const Register = () => {

  const { setUser } = useContext(UserContext)

  const navigate = useNavigate()

 
  const [error, setError] = useState(null);

 
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    passwordConfirm: "",
  });


  const handleRegister = async (e) => {
    e.preventDefault();

    try {
 
      await registerUser(
        formData.email,
        formData.password,
        formData.passwordConfirm
      );

      setUser({email: formData.email, events: []})
     
      navigate('/dashboard')
    } catch (error) {
      setError(error.message);
    }
  };
  return (
    <section className="card">
      <h1 className="title">Create a new account</h1>

      <form onSubmit={handleRegister}>
        <input
          type="email"
          placeholder="Email Address"
          className="input"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          autoFocus
        />
        <input
          type="password"
          placeholder="Password"
          className="input"
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
        />
        <input
          type="password"
          placeholder="Confirm Password"
          className="input"
          value={formData.passwordConfirm}
          onChange={(e) =>
            setFormData({ ...formData, passwordConfirm: e.target.value })
          }
        />
        <button className="btn">Register</button>
      </form>

      {error && <Alert msg={error} />}
    </section>
  );
};

export default Register;
