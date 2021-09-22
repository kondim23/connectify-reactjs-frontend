import {Card, ListGroupItem} from "react-bootstrap";
import {useContext} from "react";
import UserToVisitContext from "../../store/userToVisit-context";
import {Link} from "react-router-dom";
import UserContext from "../../store/user-context";

function UserConnection(props){

    const userToVisit = useContext(UserToVisitContext);
    const connectedUser = useContext(UserContext);

    function setUserToVisit(){userToVisit.setUserToVisitInfo(props.user)}

    if (props.user.email !== connectedUser.email) return(
        <ListGroupItem as={Link} to={'/user'} onClick={setUserToVisit}>
            {props.user.name+" "+props.user.surname}
        </ListGroupItem>
    )
    else return(
        <ListGroupItem as={Link} to={'/profile'}>
                {props.user.name + ' ' + props.user.surname}
        </ListGroupItem>
    )
}

export default UserConnection;