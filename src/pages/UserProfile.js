import {Button, Card, Col, Container, Form, Row} from "react-bootstrap";
import {useContext, useEffect, useState} from "react";
import UserToVisitContext from "../store/userToVisit-context";
import UserContext from "../store/user-context";
import UserConnectionList from "../Components/UserProfile/UserConnectionList";
import {apiUrl} from "../baseUrl";
import {Redirect, useHistory} from "react-router-dom";

function UserProfile(){

    const userToVisit = useContext(UserToVisitContext);
    const connectedUser = useContext(UserContext);

    const [isLoading, setIsLoading] = useState(true);
    const [connectionStatus, setConnectionStatus] = useState(null);
    const [isConnected, setIsConnected] = useState(false);
    const [isSelf, setIsSelf] = useState(false);
    const [usersConnected, setUsersConnected] = useState([]);

    const history = useHistory();

    function sendMessageHandler(){

        history.push({
            pathname: '/messaging',
            state: { user: {
                    name:userToVisit.name,
                    surname:userToVisit.surname,
                    email:userToVisit.email,
                    id:userToVisit.id
                } }
        })
    }

    function sendConnectionRequestHandler(){

        fetch(apiUrl+"/connections",{
            method:'POST',
            headers:{
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization':connectedUser.token
            },
            body:JSON.stringify({
                connectSender:connectedUser,
                connectReceiver:userToVisit,
                pending:true
            })
        }).then(response => {
            if (response.ok){
                setConnectionStatus("Pending");
            }
        })
    }

    function discardConnectionRequestHandler(){

        fetch(apiUrl+"/connections/discard?userId="+connectedUser.id+"&userToDisconnectId="+userToVisit.id,{
            method:'DELETE',
            headers:{
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization':connectedUser.token
            }
        }).then(response => {
            if (response.ok){
                setConnectionStatus("None");
                setIsConnected(false);
            }
        })
    }

    function setButton(){
        if (connectionStatus==="None") {
            return (
                <Button
                    variant="outline-secondary"
                    id="button-addon2"
                    style={{marginTop:'1rem'}}
                    onClick={sendConnectionRequestHandler}>
                    Send Connection Request
                </Button>
            )
        }
        else if (connectionStatus==="Connected"){
            return (
                <Row>
                    <Col lg={3}>
                        <Button
                            variant="outline-secondary"
                            id="button-addon2"
                            style={{marginTop:'1rem'}}
                            onClick={discardConnectionRequestHandler}>
                            Discard Connection
                        </Button>
                    </Col>
                    <Col>
                        <Button
                            variant="outline-secondary"
                            id="button-addon2"
                            style={{marginTop:'1rem'}}
                            onClick={sendMessageHandler}>
                            Send Message
                        </Button>
                    </Col>
                </Row>
            )
        }
        else if (connectionStatus==="Pending"){
            return (
                <Button
                    variant="outline-secondary"
                    style={{marginTop:'1rem'}}
                    id="button-addon2">
                    Pending Request
                </Button>
            )
        }
    }

    useEffect(() => {
        setIsLoading(true);
        setIsConnected(false);
        if (userToVisit.email===connectedUser.email) {
            setIsSelf(true)
            setIsLoading(false)
        }
        else fetch(apiUrl+"/connections/exist?email2="+connectedUser.email+"&email1="+userToVisit.email,{
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json',
                'Authorization':connectedUser.token
            }
        }).then((response) => { return response.text();
        }).then((connectionType) => {
            if (connectionType==="Connected") {
                fetch(apiUrl+"/connections/users?userEmail=" + userToVisit.email, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        'Authorization':connectedUser.token
                    }
                }).then((response) => {
                    return response.json();
                }).then((usersConnected) => {
                    setUsersConnected(usersConnected)
                    setIsConnected(true);
                })
            }
            else setUsersConnected([])
            setConnectionStatus(connectionType);
            setIsLoading(false);
            setIsConnected(false);
        });
    },[userToVisit.email,connectionStatus]);

    return (
        <Container>
            {isLoading ? false :
                <Row>
                    <Col lg={3}>
                        <Card style={{ width: '18rem' } }>
                            <Card.Img src={userToVisit.image} />
                        </Card>
                    </Col>
                    <Col>
                            <Card>
                                <Card.Header>{userToVisit.name+" "+userToVisit.surname}</Card.Header>
                                    <Card.Body>
                                        <div>
                                            <Form.Text>Email:</Form.Text>
                                            <Card.Text>{userToVisit.email}</Card.Text>
                                        </div>
                                        {userToVisit.phone ?
                                            <div>
                                                <Form.Text>Phone:</Form.Text>
                                                <Card.Text>{userToVisit.phone}</Card.Text>
                                            </div> : false
                                        }
                                        {userToVisit.education && (isConnected || isSelf || !userToVisit.privacyEdu) ?
                                            <div>
                                                <Form.Text>Education:</Form.Text>
                                                <Card.Text>{userToVisit.education}</Card.Text>
                                            </div> : false
                                        }
                                        {userToVisit.experience && (isConnected || isSelf || !userToVisit.privacyExp) ?
                                            <div>
                                                <Form.Text>Experience:</Form.Text>
                                                <Card.Text>{userToVisit.experience}</Card.Text>
                                            </div> : false
                                        }
                                        {userToVisit.skills && (isConnected || isSelf || !userToVisit.privacySk) ?
                                            <div>
                                                <Form.Text>Skills:</Form.Text>
                                                <Card.Text>{userToVisit.skills}</Card.Text>
                                            </div> : false
                                        }
                                        {isSelf ? false : setButton()}
                                    </Card.Body>
                            </Card>
                        {!isConnected ? false :
                            <Card style={{marginTop:'2rem'}}>
                                <Card.Header>{userToVisit.name} is connected with:</Card.Header>
                                <Card.Body>
                                    <UserConnectionList userConnected={usersConnected}/>
                                </Card.Body>
                            </Card>
                        }
                    </Col>
                </Row>
            }
        </Container>
    )
}

export default UserProfile;