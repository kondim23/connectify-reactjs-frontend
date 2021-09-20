import {InputGroup, ListGroupItem} from "react-bootstrap";
import {useContext} from "react";
import UserToVisitContext from "../../store/userToVisit-context";
import {Link} from "react-router-dom";

function AdminUser(props){

    const userToVisit = useContext(UserToVisitContext)

    function setUserToVisit(){userToVisit.setUserToVisitInfo(props.user)}
    function userSelected(){props.userSelectorHadler(props.user)}

    return (
        <ListGroupItem>
            <InputGroup className="mb-3">
                <InputGroup.Checkbox onClick={userSelected}/>
                <ListGroupItem as={Link} to={'/admin/user'} onClick={setUserToVisit}>
                    {props.user.name+" "+props.user.surname+" "+props.user.email}
                </ListGroupItem>
            </InputGroup>
        </ListGroupItem>
    )
}

export default AdminUser;