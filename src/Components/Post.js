import {Accordion, Button, Card, Container, ListGroup, ListGroupItem} from "react-bootstrap";
import {Link} from "react-router-dom";
import {useContext, useState} from "react";
import LikeContext from "../store/liked-context";
import CommentList from "./CommentList";

function Post(props){

    const likedPostContext = useContext(LikeContext);
    const postIsLiked = likedPostContext.isLiked(props);

    const [isLoading, setIsLoading] = useState(true);
    const [loadedComments, setLoadedComments] = useState([]);

    function getCommentsHandler(){

        setIsLoading(true);
        fetch("http://localhost:8080/comments?postID="+props.post.id,{
            headers : {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }).then((response) => {
            return  response.json();
        }).then((data) => {
            setIsLoading(false);
            setLoadedComments(data);
        });
    }

    function toggleLikePostHandler(){

        if (props.userLikesThisPost) {
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
                                {likedPostContext.isLiked(props) ? 'liked' : 'not liked'}
                            </Card.Text>
                            <Button variant="primary" onClick={toggleLikePostHandler}>{likedPostContext.isLiked(props) ? 'Unlike' : 'Like'}</Button>
                            <ListGroupItem>
                                <Accordion defaultActiveKey="0">
                                    <Accordion.Item>
                                        <Accordion.Header onClick={getCommentsHandler}>View Comments</Accordion.Header>
                                        <Accordion.Body>
                                            {isLoading ? false : <CommentList comments={loadedComments}/>}
                                        </Accordion.Body>
                                    </Accordion.Item>
                                </Accordion>
                            </ListGroupItem>
                        </ListGroup>
                    </Card.Body>
                </Card>
            </Container>
        </ListGroupItem>
    )
}

export default Post;