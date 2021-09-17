import {ListGroup} from "react-bootstrap";
import AdminUser from "./AdminUser";

function AdminUserList(props){

    return (
        <ListGroup variant={"flush"}>
        {props.users.map((user) => <AdminUser user={user} userSelectorHadler={props.userSelectorHandler}/>)}
        </ListGroup>
    )
}

export default AdminUserList;