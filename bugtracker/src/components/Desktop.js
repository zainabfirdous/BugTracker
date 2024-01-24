import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
//import NavDropdown from 'react-bootstrap/NavDropdown';
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';

export default function Desktop() {
    const navigate = useNavigate();

    const [ ismytoken, setMyToken] = useState(false);

    const handleLogin = () => {
        navigate("/Login", { replace: true });
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
