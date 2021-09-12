import {Button, Card, Container, ListGroupItem} from "react-bootstrap";
import {useContext} from "react";
import UserContext from "../store/user-context";

function Job(props){

    const connectedUser = useContext(UserContext);

    function submitRequestHandler(){

        fetch("http://localhost:8080/jobs/requests",{
            method:'POST',
            headers:{
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body:JSON.stringify({
                date : new Date().getUTCDate(),
                applicantUser : connectedUser,
                jobToApply : props.job
            })
        })
    }

    return (
        <ListGroupItem>
            <Container>
                <Card>
                    <Card.Body>
                        <Card.Text>{props.job.description}</Card.Text>
                        <Card.Footer>{props.job.creatorJob.name + " " + props.job.creatorJob.surname}</Card.Footer>
                        <Button variant="outline-secondary" id="button-addon2" onClick={submitRequestHandler}>Apply</Button>
                    </Card.Body>
                </Card>
            </Container>
        </ListGroupItem>
    )
}

export default Job;