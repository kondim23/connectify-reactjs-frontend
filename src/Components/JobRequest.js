import {ListGroupItem} from "react-bootstrap";

function JobRequest(props){

    return (
        <ListGroupItem>
            <p>{props.request.applicantUser.name + " " + props.request.applicantUser.surname} has sent a request
            for job {props.request.jobToApply.description}. </p>
        </ListGroupItem>
    )
}

export default JobRequest;