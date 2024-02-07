import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
//import NavDropdown from 'react-bootstrap/NavDropdown';
import { useNavigate } from "react-router-dom";


export default function Desktop() {
 // axios.defaults.withCredentials = true;
    const navigate = useNavigate();

    const handleLogin = () => {
        navigate("/Login", { replace: true });
      };
  return (
    <>
    <div>
        <Navbar style={{ backgroundColor: 'aqua'}}  collapseOnSelect expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="/Login">Bug Tracking</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#features">Features</Nav.Link>
            <Nav.Link href="#pricing">About Us</Nav.Link>
            {/* <NavDropdown title="Dropdown" id="collapsible-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown> */}
          </Nav>
          </Navbar.Collapse>
          {/* <Nav>
            <Nav.Link className='float-right' href="#deets">More deets</Nav.Link>
            <Nav.Link className='float-right'eventKey={2} href="#memes">
              Dank memes
            </Nav.Link>
          </Nav> */}
          <button class="btn btn-success btn-lg float-right" type="submit" onClick={() => handleLogin()}> Login</button>
        
      </Container>
    </Navbar>
    </div>
    
    </>
  )
}
