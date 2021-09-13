import {Col, ListGroupItem, Row, Button} from "react-bootstrap";
import {useContext} from "react";
import UserContext from "../store/user-context";

function ConnectRequest(props){

    const connectedUser = useContext(UserContext);

    function acceptConnectionRequest(){

        fetch('http://localhost:8080/connections/'+connectedUser.email+
            "?senderEmail="+props.connectionRequest.connectSender.email,{
                method:'PUT',
                headers:{
                    'Accept' : 'application/json',
                    'Content-Type' : 'application/json'
                }
            }
        );
    }

    function rejectConnectionRequest(){

        fetch('http://localhost:8080/connections?userEmail='+connectedUser.email+
            "&userToDisconnectEmail="+props.connectionRequest.connectSender.email,{
                method:'DELETE',
                headers:{
                    'Accept' : 'application/json',
                    'Content-Type' : 'application/json'
                }
            }
        );
    }

    return(
        <ListGroupItem>
            <Row>
                <Col xs={10}>
                    <text>
                        {props.connectionRequest.connectSender.name + " " + props.connectionRequest.connectSender.surname} wants to
                        connect with you!
                    </text>
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