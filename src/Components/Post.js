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
                <Card>
                    <Card.Header>
                        {props.post.postCreator.name + ' ' + props.post.postCreator.surname}
                    </Card.Header>
                    {props.post.image? <Card.Img variant="top" src={props.post.image} /> : null}
                    <Card.Body>
                        <ListGroup variant="flush">
                            <ListGroupItem>
                                <Card.Text>
                                    {props.post.description}
                                </Card.Text>
                            </ListGroupItem>
                            <ListGroupItem>
                            <Button
                                variant="outline-secondary"
                                id="button-addon2"
                                onClick={toggleLikePostHandler}
                                style={{width:'7rem'}}>
                                {likedPostContext.isLiked(props) ? 'Unlike' : 'Like'}
                            </Button>
                            </ListGroupItem>
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
        </ListGroupItem>
    )
}

export default Post;