import {Card, ListGroup} from "react-bootstrap";
import {Link} from "react-router-dom";
import {useContext} from "react";
import UserContext from "../store/user-context";

function HomePageLeftSideBar(){

    const connectedUser = useContext(UserContext);
    console.log(connectedUser)

    return (
            <Card style={{ width: '18rem' } }>
                <Card.Img variant="top" src={connectedUser.image} />
                <Card.Body>
                    <ListGroup variant="flush">
                        <ListGroup.Item as={Link} to={"/profile"}>Personal Info</ListGroup.Item>
                        <ListGroup.Item as={Link} to={"/network"}>My Network</ListGroup.Item>
                    </ListGroup>
                </Card.Body>
            </Card>)
}

export default HomePageLeftSideBar;