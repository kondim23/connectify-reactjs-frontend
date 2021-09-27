import {Accordion, Button, Card, Container, ListGroup, ListGroupItem} from "react-bootstrap";
import {Link, useHistory} from "react-router-dom";
import {useContext, useState} from "react";
import LikeContext from "../../store/liked-context";
import CommentList from "./CommentList";
import NewComment from "./NewComment";
import {apiUrl} from "../../baseUrl";
import UserContext from "../../store/user-context";

function Post(props){

    const likedPostContext = useContext(LikeContext);
    const connectedUser = useContext(UserContext);
    const postIsLiked = likedPostContext.isLiked(props);

    const [isLoading, setIsLoading] = useState(true);
    const [loadedComments, setLoadedComments] = useState([]);

    const history = useHistory()

    function getCommentsHandler(){

        setIsLoading(true);
        fetch(apiUrl+"/comments?postID="+props.post.id,{
            headers : {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization':connectedUser.token
            }
        }).then((response) => {
            return  response.json();
        }).then((data) => {
            setIsLoading(false);
            setLoadedComments(data);
        });
    }

    function toggleLikePostHandler(){

        if (postIsLiked) {
            likedPostContext.unlikePost(props);
        }
        else{
            likedPostContext.likePost(props);
        }
    }

    function visitUser(){

        fetch(apiUrl+"/user/image?userEmail="+props.post.postCreator.email,{
            headers:{
                'Authorization':connectedUser.token
            }
        }).then(response => {
            return response.blob()
        }).then((image) => {

            props.post.postCreator.image = image.size ? URL.createObjectURL(image) :
                "https://www.kindpng.com/picc/m/24-248253_user-profile-default-image-png-clipart-png-download.png"
            history.push({
                pathname: '/user/'+props.post.postCreator.email,
                state: { userToVisit: props.post.postCreator }
            })
        })
    }

    return (
        <ListGroupItem>
                <Card>
                    <Card.Body>
                        <ListGroup variant="flush">
                            {props.post.postCreator.email===connectedUser.email ?
                                <ListGroupItem as={Link} to={'/profile'}>
                                    <Card.Title>
                                        {props.post.postCreator.name + ' ' + props.post.postCreator.surname}
                                    </Card.Title>
                                </ListGroupItem> :
                                <ListGroupItem onClick={visitUser}>
                                    <Card.Title>
                                        {props.post.postCreator.name + ' ' + props.post.postCreator.surname}
                                    </Card.Title>
                                </ListGroupItem>
                            }
                            {props.post.image ? <ListGroupItem> <Card.Img variant="top" src={props.post.image}/> </ListGroupItem> : null }
                            <ListGroupItem>
                                <Card.Text>
                                    {props.post.description}
                                </Card.Text>
                                <Button
                                    variant="outline-secondary"
                                    id="button-addon2"
                                    onClick={toggleLikePostHandler}
                                    style={{width:'7rem',marginBottom:'1rem'}}>
                                    {postIsLiked ? 'Unlike' : 'Like'}
                                </Button>
                                <Accordion defaultActiveKey="0">
                                    <Accordion.Item>
                                        <Accordion.Header onClick={getCommentsHandler}>View Comments</Accordion.Header>
                                        <Accordion.Body>
                                            <Container>
                                                {isLoading ? false : <CommentList comments={loadedComments}/>}
                                                <NewComment post={props.post} newCommentHandler={getCommentsHandler}/>
                                            </Container>
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