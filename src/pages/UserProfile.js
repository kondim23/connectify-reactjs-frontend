import {Button, Card, Col, Container, Form, Row} from "react-bootstrap";
import {useContext, useEffect, useState} from "react";
import UserToVisitContext from "../store/userToVisit-context";
import UserContext from "../store/user-context";
import UserConnectionList from "../Components/UserConnectionList";

function UserProfile(){

    const userToVisit = useContext(UserToVisitContext);
    const connectedUser = useContext(UserContext);

    const [isLoading, setIsLoading] = useState(true);
    const [connectionStatus, setConnectionStatus] = useState(null);
    const [usersConnected, setUsersConnected] = useState([]);

    function sendConnectionRequestHandler(){

        fetch("http://localhost:8080/connections",{
            method:'POST',
            headers:{
                'Content-Type': 'application/json',
                'Accept': 'application/json'
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

        fetch("http://localhost:8080/connections?userEmail="+connectedUser.email+"&userToDisconnectEmail="+userToVisit.email,{
            method:'DELETE',
            headers:{
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }).then(response => {
            if (response.ok){
                setConnectionStatus("None");
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
                <Button
                    variant="outline-secondary"
                    id="button-addon2"
                    style={{marginTop:'1rem'}}
                    onClick={discardConnectionRequestHandler}>
                    Discard Connection
                </Button>
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
        fetch("http://localhost:8080/connections/exist?email2="+connectedUser.email+"&email1="+userToVisit.email,{
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            }
        }).then((response) => { return response.text();
        }).then((connectionType) => {
                fetch("http://localhost:8080/connections/users?userEmail="+userToVisit.email,{
                    headers : {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    }
                }).then((response) => {
                    return  response.json();
                }).then((usersConnected)=>{
                    setUsersConnected(usersConnected)
                })
            setConnectionStatus(connectionType);
            setIsLoading(false);});
    },[]);

    return (
        <Container>
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
                            <Form.Text>Email:</Form.Text>
                            <Card.Text>{userToVisit.email}</Card.Text>
                            {userToVisit.phone ?
                                <div>
                                    <Form.Text>Phone:</Form.Text>
                                    <Card.Text>{userToVisit.phone}</Card.Text>
                                </div> : false
                            }
                            {(connectionStatus==="Connected" || !userToVisit.privacyEdu ||
                                userToVisit.email===connectedUser.email) && userToVisit.education && !isLoading ?
                                <div>
                                    <Form.Text>education:</Form.Text>
                                    <Card.Text>{userToVisit.education}</Card.Text>
                                </div> : false
                            }
                            {(connectionStatus==="Connected" || !userToVisit.privacyExp ||
                                userToVisit.email===connectedUser.email) && userToVisit.experience && !isLoading ?
                                <div>
                                    <Form.Text>Experience:</Form.Text>
                                    <Card.Text>{userToVisit.experience}</Card.Text>
                                </div> : false
                            }
                            {(connectionStatus==="Connected" || !userToVisit.privacySk ||
                                userToVisit.email===connectedUser.email) && userToVisit.skill && !isLoading ?
                                <div>
                                    <Form.Text>Skills:</Form.Text>
                                    <Card.Text>{userToVisit.skill}</Card.Text>
                                </div> : false
                            }
                            { !isLoading && connectedUser.email!==userToVisit.email ? setButton() : false}
                        </Card.Body>
                    </Card>
                    {!isLoading && connectedUser.email !== userToVisit.email && connectionStatus==="Connected"?
                        <Card style={{marginTop:'2rem'}}>
                            <Card.Header>{userToVisit.name} is connected with:</Card.Header>
                            <Card.Body>
                                <UserConnectionList userConnected={usersConnected}/>
                            </Card.Body>
                        </Card> : false
                    }
                </Col>
            </Row>
        </Container>
    )
}

export default UserProfile;