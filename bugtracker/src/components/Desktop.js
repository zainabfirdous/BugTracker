import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
//import NavDropdown from 'react-bootstrap/NavDropdown';
import { useNavigate } from "react-router-dom";


export default function Desktop() {
    const navigate = useNavigate();

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
            <Nav.Link href="/Employee">Employee</Nav.Link>
            <Nav.Link href="/Project">Project</Nav.Link>
            <Nav.Link href="#pricing">Bug Register</Nav.Link>
            <Nav.Link href="#pricing">Bug Report</Nav.Link>
          </Nav>
          </Navbar.Collapse>
          <button class="btn btn-success btn-lg float-right" type="submit" onClick={() => handleLogout()}> Logout</button>
      </Container>
    </Navbar>
    </>
  )
}
