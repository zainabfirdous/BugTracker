import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import BugRegistrationForm from './components/BugRegistrationForm';
import React from 'react';
import { useContext } from 'react';
import NoteContext from '../src/Context/NoteContext'


export default function Dashboard() {

  const contextdata = useContext(NoteContext);
  const {setUserInfo } = useContext(NoteContext);
  
  axios.defaults.headers.common['Authorization'] = contextdata.token;

  const [urole, setUser] = useState("");
  const [isLogin, setIsLogin] = useState(false);

  const navigate = useNavigate();

  const [show, setShow] = useState(false);
  const [bugShow, setBugShow] = useState(false);
  const [showprof, setShowprof] = useState(false);
  const handleClose = () => setShow(false);
  const handleCloseBug = () => setBugShow(false);
  const handleCloseprof = () => setShowprof(false);
  const [bgcolor, setBgColor] = useState("");
  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const [isAlertVisibleBug, setIsAlertVisibleBug] = useState(false);
  const [isAlertVisible1, setIsAlertVisible1] = useState(false);
  const [message, setSetMessage] = useState("");
  const [profile, setProfile] = useState({});
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword1, setNewPassword1] = useState("");
  const [newPassword2, setNewPassword2] = useState("");


  const timeout = () => {
    setTimeout(() => {
      const token = contextdata.token;
      if (token === null) {
        setShow(true)
        setIsAlertVisible(true);
        setBgColor("bg-warning");
        setSetMessage("Session Time Out");
        navigate("/Login", { replace: false });
        setIsLogin(false);
      }
    }, 1000 * 60 * 60);
  }

  useEffect(() => {
    const token = contextdata.token;
    // if (token === null) navigate("/", { replace: true });
    if (token !== null) {
      setIsLogin(true);
    }

    getData(contextdata);
    setUser(contextdata.urole);
  }, [contextdata, navigate])


  const handleLogout = () => {
    setUserInfo((prevUserInfo) => ({
      ...prevUserInfo,
      user: null,
      urole: null,
      uid : null,
      token : null
    }));
    setIsLogin(false);
   navigate("/AppInfo", { replace: true });
  };



  const getData = async (contextdata) => {
    
  }


  const handleProfile = async () => {
    setShowprof(true)
    setIsAlertVisible1(true);
    setBgColor("bg-warning");
    try {
      const data = await axios.get(`/${contextdata.urole === "Admin" ? "admin/adminDashboard/id" : contextdata.urole === "Developer" ? "dev/devDashboard" : "tester/testerDashboard"}`);
     setProfile(data.data);
    } catch (e) {
    }
  }

  const handleLogin = () => {
    navigate("/Login");
    timeout();
  };

  const handleCreateBug = () => {
    setBugShow(true);
    setIsAlertVisibleBug(true);
  }

  const handleUpdatePassword = async () => {

    if (newPassword1 !== newPassword2) {
      setShow(true)
      setIsAlertVisible(true);
      setShow(true);
      setBgColor("bg-danger");
      setSetMessage("Password Not Matching!!!");
      setTimeout(() => {
        setIsAlertVisible(false);
      }, 5000);
    }
    else {
      const body = {
        Newpassword: newPassword1,
        Oldpassword: oldPassword
      }
      try {
        const response = await axios.put(`/${contextdata.urole === "Developer" ? "dev" : "tester"}/updatePassword`, body);
        if (response) {
          setShow(true)
          setIsAlertVisible(true);
          setShow(true);
          setBgColor("bg-success");
          setSetMessage("Password updated Successfully!!!");
          setTimeout(() => {
            setIsAlertVisible(false);
          }, 5000);
          setOldPassword("");
          setNewPassword1("");
          setNewPassword2("");
        }

      }
      catch (e) {
        console.log(e);
        setShow(true)
        setIsAlertVisible(true);
        setShow(true);
        setBgColor("bg-warning");
        setSetMessage(e.response.data.error);
        setTimeout(() => {
          setIsAlertVisible(false);
        }, 5000);
      }
    }
  }

  const handelInput = (e) => {
    switch (e.target.id) {
      case "oldPassword":
        setOldPassword(e.target.value);
        break;
      case "newPassword1":
        setNewPassword1(e.target.value);
        break;
      case "newPassword2":
        setNewPassword2(e.target.value);
        break;
      default:
        break;
    }
  }

  return (
    <>

      {/* Alert Message */}
      <div className="App">
        {isAlertVisible && <Modal show={show} onHide={handleClose}>
          <Modal.Header className="bg-white">
            <Modal.Title></Modal.Title>
          </Modal.Header>
          <Modal.Body className="bg-white" >{message}</Modal.Body>
          <Modal.Footer className={bgcolor} >
            <Button variant="warning" className='h-1' onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>}
      </div>

      {/* Create Bug */}
      <div className="App">
        {isAlertVisibleBug && <Modal show={bugShow} onHide={handleClose}>

          <BugRegistrationForm />
          <Modal.Footer className={bgcolor} >
            <Button variant="warning" className='h-1' onClick={handleCloseBug}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>}
      </div>

      {/* Profile */}
      {
        urole === "Admin" ?
          <div className="App">
            {isAlertVisible1 && <Modal show={showprof} onHide={handleCloseprof}>
              <Modal.Header className="bg-white">
                <Modal.Title></Modal.Title>
              </Modal.Header>
              <Modal.Body className="bg-white" >ID : {profile.admID}<br></br> Name : {profile.fName} {profile.lName}
                <br></br>Email :   {profile.email}
              </Modal.Body>
            </Modal>}
          </div>
          :
          <div className="App">
            {isAlertVisible1 && <Modal show={showprof} onHide={handleCloseprof}>
              <Modal.Header className="bg-white">
                <Modal.Title>Profile </Modal.Title>
              </Modal.Header>
              <Modal.Body className="bg-white" >ID : {profile.empID}<br></br> Name : {profile.fName} {profile.lName}
                <br></br>Email :  {profile.email}
              </Modal.Body>

              <Modal.Body className="bg-white" >
                <div className='row'>
                  <div className='col-12'>
                    <label>Change Password </label>
                  </div>
                </div>
                <div className='row'>
                  <div className='col-6'>
                    <label >Old Password :</label> <input className="form-control" id='oldPassword' value={oldPassword} onChange={handelInput} style={{ width: "100%" }}></input>
                  </div>
                </div>
                <div className='row'>
                  <div className='col-6 mt-1'>
                    <label >New Password :</label> <input id='newPassword1' value={newPassword1} onChange={handelInput} className="form-control" style={{ width: "100%" }}></input>
                  </div>
                  <div className='col-6' mt-1>
                    <label  > Confirm Password : </label> <input id='newPassword2' value={newPassword2} onChange={handelInput} className="form-control" style={{ width: "100%" }}></input>
                  </div>
                </div>
                <div className='row'>
                  <div className='col-6 mt-2'>
                    <Button variant="success" className='h-1' onClick={handleUpdatePassword}>
                      Update Password
                    </Button>
                  </div>
                </div>

              </Modal.Body>
              <Modal.Footer className={bgcolor} >
                <Button variant="success" className='h-1' onClick={() => { navigate("/UserProject", { replace: true }, setShowprof(false)); }}>
                  Projects
                </Button>
                <Button variant="warning" className='h-1' onClick={handleCloseprof}>
                  Close
                </Button>
              </Modal.Footer>
            </Modal>}
          </div>

      }


      {/* nav bar */}

      {/* <Navbar style={{ backgroundColor: 'aqua' }} collapseOnSelect expand="lg" className="bg-body-tertiary">
        <Container>
          {localStorage.user ? <Navbar.Brand href="/BugReport" >Bug Tracking</Navbar.Brand> : <Navbar.Brand href="/AppInfo">Bug Tracking</Navbar.Brand>}
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav >
              {localStorage.user ? (urole === "Admin" ? <div onClick={() => navigate('/Employee')}>
                <Nav.Link>Employee</Nav.Link>
              </div> : <div></div>) : <Nav.Link href="/AppInfo">Features</Nav.Link>}
              {localStorage.user ? (urole === "Admin" ? <Nav.Link href="/Project">Project</Nav.Link> : <div></div>) : <Nav.Link href="/AppInfo">About Us</Nav.Link>}
              {localStorage.user ? (urole === "Admin" || urole === "Tester" ? <Nav.Link href="/BugReg">Bug Register</Nav.Link> : <div></div>) : <Nav.Link></Nav.Link>}

              {localStorage.user ? (
                urole === "Admin" ? (
                  <div onClick={() => navigate('/BugTracking')}>
                    <Nav.Link>Bug Report</Nav.Link>
                  </div>
                ) : (
                  urole === "Tester" ? (
                    <div onClick={() => navigate('/TesterBugPortal')}>
                      <Nav.Link>Bug Report</Nav.Link>
                    </div>
                  ) : (
                    <div onClick={() => navigate('/DevBugPortal')}>
                      <Nav.Link>Bug Report</Nav.Link>
                    </div>
                  )
                )
              ) : (
                <Nav.Link></Nav.Link>
              )}
              {localStorage.user ? (urole === "Admin" ? <Nav.Link href="/Team">Team</Nav.Link> : <div></div>) : <Nav.Link></Nav.Link>}
              {localStorage.user ? (urole === "Admin" ? <Nav.Link href="/ProjectAssign">Project Assign</Nav.Link> : <div></div>) : <Nav.Link></Nav.Link>}
              {localStorage.user ? (urole === "Admin" || urole === "Tester" ? <button class="btn btn-info btn-lg float-right p-1" type="submit" onClick={() => handleCreateBug()}> Create</button> : <div></div>)
                : <div></div>}
            </Nav>

          </Navbar.Collapse>
          <Nav.Link className='float-right text-uppercase' > <button class="btn bg-aqua" style={{ backgroundColor: 'aqua' }} type="submit"
            onClick={() => handleProfile()}>{localStorage.user}<br></br>{localStorage.urole} </button> </Nav.Link>
          {localStorage.user ? <button class="btn btn-success btn-lg float-right" type="submit" onClick={() => handleLogout()}> Logout</button>
            : <button class="btn btn-success btn-lg float-right" type="submit" onClick={() => handleLogin()}> Login</button>}

        </Container>
      </Navbar> */}
      <Navbar style={{ backgroundColor: 'aqua' }} collapseOnSelect expand="lg" className="bg-body-tertiary">
        <Container>
          {isLogin ? (
            <Navbar.Brand onClick={() => navigate('/BugReport')}>Bug Tracking</Navbar.Brand>
          ) : (
            <Navbar.Brand onClick={() => navigate('/AppInfo')}>Bug Tracking</Navbar.Brand>
          )}
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav >
              {isLogin ? (
                urole === "Admin" ? (
                  <div onClick={() => navigate('/Employee')}>
                    <Nav.Link>Employee</Nav.Link>
                  </div>
                ) : <div></div>
              ) : (
                <Nav.Link onClick={() => navigate('/AppInfo')}>Features</Nav.Link>
              )}

              {isLogin ? (
                urole === "Admin" ? (
                  <Nav.Link onClick={() => navigate('/Project')}>Project</Nav.Link>
                ) : <div></div>
              ) : (
                <Nav.Link onClick={() => navigate('/AppInfo')}>About Us</Nav.Link>
              )}

              {isLogin ? (
                urole === "Admin" || urole === "Tester" ? (
                  <Nav.Link onClick={() => navigate('/BugReg')}>Bug Register</Nav.Link>
                ) : <div></div>
              ) : (
                <Nav.Link></Nav.Link>
              )}
              {isLogin ? (
                urole === "Admin" ? (
                  <div onClick={() => navigate('/BugTracking')}>
                    <Nav.Link>Bug Report</Nav.Link>
                  </div>
                ) : (
                  urole === "Tester" ? (
                    <div onClick={() => navigate('/TesterBugPortal')}>
                      <Nav.Link>Bug Report</Nav.Link>
                    </div>
                  ) : (
                    <div onClick={() => navigate('/DevBugPortal')}>
                      <Nav.Link>Bug Report</Nav.Link>
                    </div>
                  )
                )
              ) : (
                <Nav.Link></Nav.Link>
              )}

              {isLogin ? (
                urole === "Admin" ? (
                  <Nav.Link onClick={() => navigate('/Team')}>Team</Nav.Link>
                ) : <div></div>
              ) : (
                <Nav.Link></Nav.Link>
              )}

              {isLogin ? (
                urole === "Admin" ? (
                  <Nav.Link onClick={() => navigate('/ProjectAssign')}>Project Assign</Nav.Link>
                ) : <div></div>
              ) : (
                <Nav.Link></Nav.Link>
              )}

              {isLogin ? (
                urole === "Admin" || urole === "Tester" ? (
                  <button
                    className="btn btn-info btn-lg float-right p-1"
                    type="submit"
                    onClick={() => handleCreateBug()}
                  >
                    Create
                  </button>
                ) : <div></div>
              ) : <div></div>}
            </Nav>

          </Navbar.Collapse>
          {/* <div className='row'>
            <div className='col-6'><Nav.Link className='float-right' >{localStorage.user} {localStorage.urole}</Nav.Link></div>
          </div> */}
          {

            isLogin ?
              <Nav.Link className='float-right text-uppercase' > <button class="btn bg-aqua" style={{ backgroundColor: 'aqua' }} type="submit"
                onClick={() => handleProfile()}>{contextdata.user}<br></br>{contextdata.urole} </button> </Nav.Link>
                :
                <Nav.Link className='float-right text-uppercase' >  </Nav.Link>
          }

          {isLogin ? <button class="btn btn-success btn-lg float-right" type="submit" onClick={() => handleLogout()}> Logout</button>
            : <button class="btn btn-success btn-lg float-right" type="submit" onClick={() => handleLogin()}> Login</button>}

        </Container>
      </Navbar>
    </>
  )
}
