import {Col, ListGroupItem, Row, Button} from "react-bootstrap";
import {useContext} from "react";
import UserContext from "../../store/user-context";
import UserToVisitContext from "../../store/userToVisit-context";
import {Link} from "react-router-dom";

function ConnectRequest(props){

    const connectedUser = useContext(UserContext);
    const userToVisit = useContext(UserToVisitContext);

    function setUserToVisit(){userToVisit.setUserToVisitInfo(props.connectionRequest.connectSender)}

    function acceptConnectionRequest(){

        fetch('http://localhost:8080/connections/accept?userId='+connectedUser.id+
            "&senderId="+props.connectionRequest.connectSender.id,{
                method:'PUT',
                headers:{
                    'Accept' : 'application/json',
                    'Content-Type' : 'application/json'
                }
            }
        ).then((response) => {
            if (response.ok) props.requestAnsweredHandler()
        });
    }

    function rejectConnectionRequest(){

        fetch('http://localhost:8080/connections/discard?userId='+connectedUser.id+
            "&userToDisconnectId="+props.connectionRequest.connectSender.id,{
                method:'DELETE',
                headers:{
                    'Accept' : 'application/json',
                    'Content-Type' : 'application/json'
                }
            }
        ).then((response) => {
            if (response.ok) props.requestAnsweredHandler()
        });
    }

    return(
        <ListGroupItem>
            <Row>
                <Col xs={10}>
                    <ListGroupItem as={Link} to={'/user'} onClick={setUserToVisit}>
                        {props.connectionRequest.connectSender.name + " " + props.connectionRequest.connectSender.surname} wants
                        to connect with you!
                    </ListGroupItem>
                </Col>
                <Col xs={1}>
                    <Button style={{width:'6rem'}} variant="outline-primary" id="button-addon2" onClick={acceptConnectionRequest}>Connect</Button>
                </Col>
                <Col xs={1}>
                    <Button style={{width:'6rem'}} variant="outline-danger" id="button-addon2" onClick={rejectConnectionRequest}>Reject</Button>
                </Col>
            </Row>
        </ListGroupItem>
    )
}

export default ConnectRequest;