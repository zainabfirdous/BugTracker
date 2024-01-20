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
      }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/", { replace: true });
      };

      
  return (
    <>
     <Navbar style={{ backgroundColor: 'aqua'}}   collapseOnSelect expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="/Login">Bug Tracking</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav >
            {ismytoken ? <Nav.Link href="/Employee">Employee</Nav.Link> : <Nav.Link href="#features">Features</Nav.Link>}
            {ismytoken ? <Nav.Link href="/Project">Project</Nav.Link> : <Nav.Link href="#pricing">About Us</Nav.Link>}
            {ismytoken ? <Nav.Link href="#pricing">Bug Register</Nav.Link> : <Nav.Link></Nav.Link>}
            {ismytoken ?  <Nav.Link href="#pricing">Bug Report</Nav.Link> : <Nav.Link></Nav.Link> }
          </Nav>
          </Navbar.Collapse>
          {ismytoken ?  <button class="btn btn-success btn-lg float-right" type="submit" onClick={() => handleLogout()}> Logout</button> 
          :  <button class="btn btn-success btn-lg float-right" type="submit" onClick={() => handleLogin()}> Login</button> }
          
      </Container>
    </Navbar>
    </>
  )
}
