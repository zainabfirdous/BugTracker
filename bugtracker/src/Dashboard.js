import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

export default function Dashboard() {
    const navigate = useNavigate();

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const [bgcolor, setBgColor] = useState("");
    const [ isAlertVisible, setIsAlertVisible ] = useState(false);
    const [message, setSetMessage] = useState("");

    const timeout = () =>{

      setTimeout(() => {
        const token = localStorage.getItem("token");
        console.log(token);
        if(!token){
          localStorage.clear();
          setShow(true)
          setIsAlertVisible(true);
          setBgColor("bg-warning");
          setSetMessage("Session Time Out");
          navigate("/AppInfo", { replace: false });
          setMyToken(false);
        }
    }, 50000);
     
    }

    const [ ismytoken, setMyToken] = useState(false);

    const handleLogin = () => {
        navigate("/Login", { replace: true });
        timeout();
      };

      useEffect(() => {
        const token = localStorage.getItem("token");
        console.log(token + " " + ismytoken);
        if (token) {
          setMyToken(true);
        }
        console.log(token + " " + ismytoken);
      }, [ismytoken]);

    const handleLogout = () => {
      localStorage.clear();
        navigate("/AppInfo", { replace: false });
        setMyToken(false);
      };
    
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

      {/* nav bar */}
     <Navbar style={{ backgroundColor: 'aqua'}}   collapseOnSelect expand="lg" className="bg-body-tertiary">
      <Container>
      {localStorage.user ? <Navbar.Brand href="/Welcome">Bug Tracking</Navbar.Brand> : <Navbar.Brand href="/AppInfo">Bug Tracking</Navbar.Brand>}
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav >
            {localStorage.user ? <Nav.Link href="/Employee" >Employee</Nav.Link> : <Nav.Link href="/AppInfo">Features</Nav.Link>}
            {localStorage.user ? <Nav.Link href="/Project">Project</Nav.Link> : <Nav.Link href="/AppInfo">About Us</Nav.Link>}
            {localStorage.user ? <Nav.Link href="/BugReg">Bug Register</Nav.Link> : <Nav.Link></Nav.Link>}
            {localStorage.user ?  <Nav.Link href="/Welcome">Bug Report</Nav.Link> : <Nav.Link></Nav.Link> }
            {localStorage.user ?  <Nav.Link href="/Team">Team</Nav.Link> : <Nav.Link></Nav.Link> }
          </Nav>
          </Navbar.Collapse>
          {/* <div className='row'>
            <div className='col-6'><Nav.Link className='float-right' >{localStorage.user} {localStorage.urole}</Nav.Link></div>
          </div> */}
          <Nav.Link className='float-right text-uppercase' >{localStorage.user} <br></br>{localStorage.urole}</Nav.Link>
          {localStorage.user ?  <button class="btn btn-success btn-lg float-right" type="submit" onClick={() => handleLogout()}> Logout</button> 
          :  <button class="btn btn-success btn-lg float-right" type="submit" onClick={() => handleLogin()}> Login</button> }
          
      </Container>
    </Navbar>
    </>
  )
}
