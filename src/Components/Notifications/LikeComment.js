import {Card, ListGroupItem} from "react-bootstrap";
import {useContext} from "react";
import UserToVisitContext from "../../store/userToVisit-context";
import {Link} from "react-router-dom";

function LikeComment(props){

    const userToVisit = useContext(UserToVisitContext)

    function setUserToVisit(){
        props.notification.comment ? userToVisit.setUserToVisitInfo(props.notification.userComments) :
            userToVisit.setUserToVisitInfo(props.notification.userLikes)
    }

    return(
        <ListGroupItem as={Link} to={'/user'} onClick={setUserToVisit}>
            {props.notification.comment ?
                <Card>
                    <Card.Body>
                            {props.notification.userComments.name + " " + props.notification.userComments.surname} commented
                            "{props.notification.comment}" on your post "{props.notification.postCommented.description}".
                    </Card.Body>
                </Card> :
                <Card>
                    <Card.Body>
                            {props.notification.userLikes.name + " " + props.notification.userLikes.surname} liked
                            your post "{props.notification.postLiked.description}".
                    </Card.Body>
                </Card>
            }
        </ListGroupItem>
    )
}

export default LikeComment;