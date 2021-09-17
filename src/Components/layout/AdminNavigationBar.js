import {Container, Nav, Navbar} from "react-bootstrap";
import {Link} from "react-router-dom";

function AdminNavigation(){

    return  (<Navbar bg="light" expand="lg" sticky={"top"}>
        <Container>
            <Navbar.Brand as={Link} to={"/"}>Administrator Page</Navbar.Brand>
        </Container>
    </Navbar>);
}

export default AdminNavigation;