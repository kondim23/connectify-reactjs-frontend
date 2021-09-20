import {ListGroupItem} from "react-bootstrap";
import {useContext} from "react";
import UserToVisitContext from "../../store/userToVisit-context";
import {Link} from "react-router-dom";

function JobRequest(props){

    const userToVisit = useContext(UserToVisitContext);

    function setUserToVisit(){userToVisit.setUserToVisitInfo(props.request.applicantUser)}

    return (
        <ListGroupItem as={Link} to={'/user'} onClick={setUserToVisit}>
            <p>{props.request.applicantUser.name + " " + props.request.applicantUser.surname} has sent a request
            for job "{props.request.jobToApply.description}". </p>
        </ListGroupItem>
    )
}

export default JobRequest;