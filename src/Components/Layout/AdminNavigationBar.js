import {Button, Container, Navbar} from "react-bootstrap";
import {Link, Redirect} from "react-router-dom";
import {useContext} from "react";
import UserContext from "../../store/user-context";

function AdminNavigation(){

    const connectedUser = useContext(UserContext);

    function logOutHandler(){
        connectedUser.setUserInfo({})
        localStorage.removeItem('connectedUser')
        return <Redirect to={'/'}/>;
    }

    return  (<Navbar bg="light" expand="lg" sticky={"top"}>
        <Container>
            <Navbar.Brand as={Link} to={"/"}>Administrator Page</Navbar.Brand>
            <Button
                variant="outline-secondary"
                id="button-addon2"
                onClick={logOutHandler}>
                Log Out
            </Button>
        </Container>
    </Navbar>);
}

export default AdminNavigation;