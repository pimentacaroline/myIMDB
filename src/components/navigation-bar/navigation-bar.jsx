import { Navbar, Container, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

export const NavigationBar = ({ user, onLoggedOut }) => {
  return (
    <Navbar bg="dark" data-bs-theme="dark" expand="lg" className="px-5">
        <Navbar.Brand as={Link} to="/">
          Fantastical
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {!user && (
							<>
								<Nav.Link as={Link} to='/login'>
									Login
								</Nav.Link>
								<Nav.Link as={Link} to='/signup'>
									Signup
								</Nav.Link>
							</>
						)}
					</Nav>
					<Nav className="ml-auto">
						{user && (
							<>

								<Nav.Link as={Link} to='/'>
									Home
								</Nav.Link>
								<Nav.Link as={Link} to='/wes-anderson'>
									Wes Anderson
								</Nav.Link>
								<Nav.Link as={Link} to='/profile'>
									My Profile
								</Nav.Link>
								<Nav.Link onClick={onLoggedOut}>
									Logout
								</Nav.Link>
							</>
						)}
          </Nav>
        </Navbar.Collapse>
    </Navbar>
  );
};

