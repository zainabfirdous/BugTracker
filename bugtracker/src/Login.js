import { useState,useEffect,React } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import axios from "axios";

export default function Login () {
  axios.withCredentials = true;
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setSetMessage] = useState("");
  
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) navigate("/Login", { replace: true });
  }, [navigate]);

  const [ isAlertVisible, setIsAlertVisible ] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const reqBody = {
      username: username,
      password: password,
    };
    try {
      const result = await axios.post(
        "http://127.0.0.1:5000/Login",
        reqBody
      );
     
      if (result.data.token) {
        // redirect to Welcome
        localStorage.setItem("token", result.data.token);
        localStorage.setItem("user", result.data.username);
        localStorage.setItem("urole", result.data.urole);
        localStorage.setItem("uid", result.data.uid);
        sessionStorage.setItem("ID",result.data.ssid);
        //navigate("/Welcome", { replace: true });
        window.location.href = "/Welcome";
        setTimeout(() => {
          localStorage.clear();
      }, 600000);
      } else {
        setIsAlertVisible(true);
        setSetMessage(result.data.error);
        setTimeout(() => {
            setIsAlertVisible(false);
        }, 40000);
      }

      // console.log(result);
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
              console.log(e.target.value);
              //   username = e.target.value; /// this will not provider update state
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
          <div className="col-6">
          <button
            type="submit"
            // onClick={handleSubmit}
            className="btn btn-primary"
          >
            Login
          </button></div>
          <div className=" col-6 d-flex justify-content-end"><button
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


