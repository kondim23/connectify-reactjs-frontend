import {Button, Card, ListGroup} from "react-bootstrap";
import {Link} from "react-router-dom";

function Post(props){

    return (
        <li>
            <Card >
                {props.image? <Card.Img variant="top" src={props.image} /> : null}
                <Card.Body>
                    <ListGroup variant="flush">
                        <Card.Text>
                            {props.description}
                        </Card.Text>
                        <Button variant="primary">Like</Button>
                        <ListGroup.Item as={Link} to={"/"}>View All Comments</ListGroup.Item>
                    </ListGroup>
                </Card.Body>
            </Card>
        </li>
    )
}

export default Post;