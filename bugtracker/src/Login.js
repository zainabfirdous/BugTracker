import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import axios from "axios";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const reqBody = {
      userName: username,
      password: password,
    };
    try {
      const result = await axios.post(
        "http://127.0.0.1:5000/login",
        reqBody
      );

      if (result.data.token) {
        // redirect to productPage
        localStorage.setItem("token", result.data.token);
        navigate("/Desktop", { replace: true });
      } else {
        
      }

      console.log(result);
    } catch (err) {
      console.log(err);
      alert(err.response.statusText);
    }
  };

  return (
    <div>
      <form className="login-form" onSubmit={handleSubmit}>
        <h3>Welcome, Please Login here!</h3>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            className="form-control"
            type="text"
            name="username"
            id="username"
            value={username}
            onChange={(e) => {
              console.log(e.target.value);
              //   username = e.target.value; /// this will not provider update state
              setUsername(e.target.value);
            }}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            className="form-control"
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="form-group">
          <button
            type="submit"
            // onClick={handleSubmit}
            className="btn btn-primary"
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
}
