import {ListGroupItem} from "react-bootstrap";
import {useContext} from "react";
import UserToVisitContext from "../../store/userToVisit-context";
import {Link} from "react-router-dom";

function UserConnection(props){

    const userToVisit = useContext(UserToVisitContext);

    function setUserToVisit(){userToVisit.setUserToVisitInfo(props.user)}

    return(
        <ListGroupItem as={Link} to={'/user'} onClick={setUserToVisit}>
            {props.user.name+" "+props.user.surname}
        </ListGroupItem>
    )
}

export default UserConnection;