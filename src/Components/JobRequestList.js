import {ListGroup} from "react-bootstrap";
import JobRequest from "./JobRequest";

function JobRequestList(props){

    return (
        <ListGroup variant={"flush"}>
            {props.requests.map(request => <JobRequest request={request}/>)}
        </ListGroup>
    )
}

export default JobRequestList;