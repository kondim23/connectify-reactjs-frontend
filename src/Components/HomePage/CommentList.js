import {ListGroup} from "react-bootstrap";
import Comment from "./Comment";

function CommentList(props) {

    return (
        <ListGroup variant={"flush"}>
            {props.comments.map(comment => <Comment commentData={comment}/>)}
        </ListGroup>
    )
}

export default CommentList;