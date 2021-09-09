import {Card, ListGroup} from "react-bootstrap";
import {Link} from "react-router-dom";

function HomePageLeftSideBar(){

    return (
            <Card style={{ width: '18rem' } }>
                <Card.Img variant="top" src="https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg" />
                <Card.Body>
                    <ListGroup variant="flush">
                        <ListGroup.Item as={Link} to={"/profile"}>Personal Info</ListGroup.Item>
                        <ListGroup.Item as={Link} to={"/network"}>My Network</ListGroup.Item>
                    </ListGroup>
                </Card.Body>
            </Card>)
}

export default HomePageLeftSideBar;