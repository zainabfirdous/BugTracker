import { useState, React, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import axios from "axios";
import NoteContext from './Context/NoteContext'
import bgImage from './background.jpg'

import Button from 'react-bootstrap/Button';

export default function Login() {



  const { setUserInfo } = useContext(NoteContext);

  axios.withCredentials = true;
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setSetMessage] = useState("");

  const navigate = useNavigate();

  const [isAlertVisible, setIsAlertVisible] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const reqBody = {
      username: username,
      password: password,
    };
    try {
      const result = await axios.post(
        "/Login",
        reqBody
      );
      if (result.data.token) {
        setUserInfo((prevUserInfo) => ({
          ...prevUserInfo,
          user: result.data.username,
          urole: result.data.urole,
          uid: result.data.uid,
          token: result.data.token
        }));
        navigate("/BugReport", { replace: true });
        setTimeout(() => {
          localStorage.clear();
        }, 600000);
      } else {
        setIsAlertVisible(true);
        setSetMessage(result.data.error);
        setTimeout(() => {
          setIsAlertVisible(false);
        }, 400000);
      }
    } catch (err) {
      console.log(err);
      alert(err.response.statusText);
    }
  };

  const handleback = () => {
    navigate("/AppInfo", { replace: true })
  }

  return (
    <>
      {/* Alert Message */}
      <div className="App">
        {isAlertVisible && <div className='alert-container'>
          <div className="row">
            <div class="alert  bg-danger  alert-dismissible  mt-4 col-md-4 offset-md-4 " role="alert">
              <strong>{message}</strong> Try Again!!!
              <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
          </div>
        </div>}
      </div>

      {/* Main Body */}
      <div className="container mt-5 p-3" style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        padding: '20px',
        boxSizing: 'border-box',
      }}>
        <form className="login-form" onSubmit={handleSubmit}>
          <h3 className="mb-4 text-center">Welcome, Please Login here!</h3>
          <div className="row">
            <div className="offset-lg-3 col-lg-6 col-md-12">
              <div className="form-group">
                <label htmlFor="username">Username</label>
                <input
                  className="form-control"
                  type="text"
                  name="username"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="offset-lg-3 col-lg-6 col-md-12">
              <div className="form-group">
                <label htmlFor="password" aria-required>Password</label>
                <input
                  className="form-control"
                  type="password"
                  name="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="col-6 d-flex justify-content-end"> <div className="form-group">
              <Button
                type="submit"  variant="primary" 
              >
              Login
              </Button>
            </div>
            </div>
            <div className="col-6 d-flex justify-content-md-left"> <div className="form-group">
              <Button
                type="submit"
                onClick={handleback} variant="info" 
              >
                Back
              </Button>
              
            </div>
            </div>
          </div>



        </form>
      </div>

    </>
  );
}


