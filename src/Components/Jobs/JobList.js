import {ListGroup} from "react-bootstrap";
import Job from "./Job";

function JobList(props){

    return (
        <ListGroup variant={"flush"}>
            {props.jobs.map(job => <Job job={job}/>)}
        </ListGroup>
    )
}

export default JobList;