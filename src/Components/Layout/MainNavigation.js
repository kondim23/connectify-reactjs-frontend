import {Container, Nav, Navbar} from "react-bootstrap";
import {Link} from "react-router-dom";

function MainNavigation(){

    return  (<Navbar bg="light" expand="lg" sticky={"top"}>
                    <Container>
                        <Navbar.Brand as={Link} to={"/"}>Linked In</Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="me-auto">
                                <Nav.Link as={Link} to={"/"}>Home</Nav.Link>
                                <Nav.Link as={Link} to={"/network"}>Network</Nav.Link>
                                <Nav.Link as={Link} to={"/jobs"}>Jobs</Nav.Link>
                                <Nav.Link as={Link} to={"/messaging"}>Messaging</Nav.Link>
                                <Nav.Link as={Link} to={"/notifications"}>Notifications</Nav.Link>
                                <Nav.Link as={Link} to={"/profile"}>Profile</Nav.Link>
                                <Nav.Link as={Link} to={"/settings"}>Settings</Nav.Link>
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>);
}

export default MainNavigation;