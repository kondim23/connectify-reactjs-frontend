import {Card, ListGroupItem} from "react-bootstrap";
import {useContext} from "react";
import UserToVisitContext from "../../store/userToVisit-context";
import {Link} from "react-router-dom";
import UserContext from "../../store/user-context";

function LikeComment(props){

    const userToVisit = useContext(UserToVisitContext)
    const connectedUser = useContext(UserContext);

    function setUserToVisit(){
        props.notification.comment ? userToVisit.setUserToVisitInfo(props.notification.userComments) :
            userToVisit.setUserToVisitInfo(props.notification.userLikes)
    }

    if (props.notification.comment) {
        if (connectedUser.email!==props.notification.userComments.email) return (
            <ListGroupItem as={Link} to={'/user'} onClick={setUserToVisit}>
                    <Card>
                        <Card.Body>
                            {props.notification.userComments.name + " " + props.notification.userComments.surname} commented
                            "{props.notification.comment}" on your post "{props.notification.postCommented.description}".
                        </Card.Body>
                    </Card>
            </ListGroupItem>
        )
        else return (
            <ListGroupItem as={Link} to={'/profile'}>
                <Card>
                    <Card.Body>
                        {props.notification.userComments.name + " " + props.notification.userComments.surname} commented
                        "{props.notification.comment}" on your post "{props.notification.postCommented.description}".
                    </Card.Body>
                </Card>
            </ListGroupItem>
        )
    }
    else {
        if (connectedUser.email!==props.notification.userLikes.email) return (
            <ListGroupItem as={Link} to={'/user'} onClick={setUserToVisit}>
                <Card>
                    <Card.Body>
                        {props.notification.userLikes.name + " " + props.notification.userLikes.surname} liked
                        your post "{props.notification.postLiked.description}".
                    </Card.Body>
                </Card>
            </ListGroupItem>
        )
        else return (
            <ListGroupItem as={Link} to={'/profile'}>
                <Card>
                    <Card.Body>
                        {props.notification.userLikes.name + " " + props.notification.userLikes.surname} liked
                        your post "{props.notification.postLiked.description}".
                    </Card.Body>
                </Card>
            </ListGroupItem>
        )
    }
}

export default LikeComment;