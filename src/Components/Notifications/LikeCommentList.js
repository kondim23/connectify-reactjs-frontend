import {ListGroup} from "react-bootstrap";
import LikeComment from "./LikeComment";

function LikeCommentList(props){

    return(
        <ListGroup variant={"flush"}>
            {props.notifications.map(notification => <LikeComment notification={notification}/>)}
        </ListGroup>
    )
}

export default LikeCommentList;