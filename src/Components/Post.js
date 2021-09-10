import {Button, Card, Container, ListGroup, ListGroupItem} from "react-bootstrap";
import {Link} from "react-router-dom";
import {useContext} from "react";
import LikeContext from "../store/liked-context";

function Post(props){

    const likedPostContext = useContext(LikeContext);

    const postIsLiked = likedPostContext.isLiked(props);

    function toggleLikePostHandler(){

        if (postIsLiked) {
            likedPostContext.unlikePost(props);
        }
        else{
            likedPostContext.likePost(props);
        }
    }

    return (
        <ListGroupItem>
            <Container >
                <Card style={{width:'40rem'}}>
                    <Card.Header>
                        {props.post.postCreator.name + ' ' + props.post.postCreator.surname}
                    </Card.Header>
                    {props.post.image? <Card.Img variant="top" src={props.post.image} /> : null}
                    <Card.Body>
                        <ListGroup variant="flush">
                            <Card.Text>
                                {props.post.description}
                            </Card.Text>
                            <Card.Text>
                                {props.userLikesThisPost ? 'liked' : 'not liked'}
                            </Card.Text>
                            <Button variant="primary" onClick={toggleLikePostHandler}>{postIsLiked ? 'Unlike' : 'Like'}</Button>
                            <ListGroup.Item as={Link} to={"/"}>View All Comments</ListGroup.Item>
                        </ListGroup>
                    </Card.Body>
                </Card>
            </Container>
        </ListGroupItem>
    )
}

export default Post;