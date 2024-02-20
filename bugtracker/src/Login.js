import { useState,React, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import axios from "axios";
import NoteContext from './Context/NoteContext'

export default function Login () {
  

  const { setUserInfo } = useContext(NoteContext);

  axios.withCredentials = true;
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setSetMessage] = useState("");
  
  const navigate = useNavigate();

  const [ isAlertVisible, setIsAlertVisible ] = useState(false);

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
          urole: result.data.urole ,
          uid : result.data.uid ,
          token : result.data.token
        }));
        navigate("/Welcome", { replace: true });
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
              setUsername(e.target.value);
            }}
          required />
        </div>
        <div className="form-group">
          <label htmlFor="password" aria-required>Password</label>
          <input
            className="form-control"
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required />
        </div>
        <div className="form-group row">
          <div className="col-6 d-flex justify-content-end">
          <button
            type="submit"
            // onClick={handleSubmit}
            className="btn btn-primary"
          >
            Login
          </button></div>
          <div className=" col-6 "><button
            type="button"
             onClick={handleback}
            className="btn btn-info"
          >
            Back
          </button></div>
        </div>
      </form>
    </div>
    
    </>
  );
}


