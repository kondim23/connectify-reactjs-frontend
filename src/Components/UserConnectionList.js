import {ListGroup} from "react-bootstrap";
import UserConnection from "./UserConnection";

function UserConnectionList(props){

    return(
        <ListGroup variant={"flush"}>
            {props.userConnected.map((user)=> <UserConnection user={user}/> )}
        </ListGroup>
    )
}

export default UserConnectionList;