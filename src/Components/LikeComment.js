import {Card, ListGroupItem} from "react-bootstrap";

function LikeComment(props){

    return(
        <ListGroupItem>
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