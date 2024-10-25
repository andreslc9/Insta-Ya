import './Header.css';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useHistory } from "react-router-dom";

function Header() {

  const history = useHistory();
  
  const handleRoute = () =>{ 
    history.push("/");
  };

  const handleLogout = () =>{
    localStorage.removeItem("token");
    localStorage.removeItem("id");
    localStorage.removeItem("isAuthenticated");
    handleRoute();
  }

  return (
    <div className='header'>
      <Navbar bg="light" expand="lg"  className='header'>
        <Container fluid className='header'>
          <Navbar.Brand>InstaYa</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarscroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: '100px' }}
            >
            </Nav>
            <Form className="d-flex" onSubmit={handleLogout}>
              <Button className='sign-out' type='submit'>Cerrar Sesión</Button>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default Header;