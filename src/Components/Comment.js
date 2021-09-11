import {ListGroupItem} from "react-bootstrap";

function Comment(props) {

    return (
        <ListGroupItem>
            <p>{props.commentData.userComments.name + ' ' + props.commentData.userComments.surname + ':'}</p>
            <p>{props.commentData.comment}</p>
        </ListGroupItem>
    )
}

export default Comment;