import {Button, Card, Col, Container, FormText, ListGroup, ListGroupItem, Row} from "react-bootstrap";
import {useContext, useState} from "react";
import UserContext from "../../store/user-context";
import {Link, useHistory} from "react-router-dom";
import {apiUrl} from "../../baseUrl";

function Job(props){

    const connectedUser = useContext(UserContext);
    const history = useHistory()
    const [apply, setApply] = useState(false);

    function visitUser(){

        const user = props.job.creatorJob

        fetch(apiUrl+"/user/image?userEmail="+user.email,{
            headers:{
                'Authorization':connectedUser.token
            }
        }).then(response => {
            return response.blob()
        }).then((image) => {

            user.image = image.size ? URL.createObjectURL(image) :
                "https://www.kindpng.com/picc/m/24-248253_user-profile-default-image-png-clipart-png-download.png"
            history.push({
                pathname: '/user/'+user.email,
                state: { userToVisit: user }
            })
        })
    }

    function submitRequestHandler(){

        fetch(apiUrl+"/jobs/requests",{
            method:'POST',
            headers:{
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization':connectedUser.token
            },
            body:JSON.stringify({
                date : new Date().toISOString(),
                applicantUser : connectedUser,
                jobToApply : props.job
            })
        }).then((response)=>{
            if (response.ok) setApply(true);
        })
    }

    return (
        <ListGroupItem id={props.job.id}>
            <Container>
                <Card>
                    <Card.Body>
                        <ListGroup variant={"flush"}>
                            <ListGroupItem>
                                <Card.Title>{props.job.title}</Card.Title>
                            </ListGroupItem>
                            <ListGroupItem>
                                <Card.Text>{props.job.description}</Card.Text>
                            </ListGroupItem>
                            <ListGroupItem onClick={visitUser}>
                                <div className={"text-muted"}>by {props.job.creatorJob.name + " " + props.job.creatorJob.surname}</div>
                            </ListGroupItem>
                            <ListGroupItem>
                                <Row>
                                    <Col lg={1}>
                                        <Button variant="outline-secondary" id="button-addon2" onClick={submitRequestHandler}>Apply</Button>
                                    </Col>
                                    <Col lg={8}>
                                        {props.job.date ? apply ?
                                            <FormText>Applied! {props.job.creatorJob.name + " " + props.job.creatorJob.surname} will be informed!</FormText> :
                                            <FormText>
                                                You have already applied on this job on {
                                                new Date(props.job.date).toLocaleDateString() + ' ' + new Date(props.job.date).toLocaleTimeString()
                                            }
                                            </FormText> : apply ?
                                            <FormText>Applied! {props.job.creatorJob.name + " " + props.job.creatorJob.surname} will be informed!</FormText>
                                            : false
                                        }
                                    </Col>
                                </Row>
                            </ListGroupItem>
                        </ListGroup>
                    </Card.Body>
                </Card>
            </Container>
        </ListGroupItem>
    )
}

export default Job;