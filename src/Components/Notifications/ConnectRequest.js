import {Col, ListGroupItem, Row, Button} from "react-bootstrap";
import {useContext} from "react";
import UserContext from "../../store/user-context";
import {useHistory} from "react-router-dom";
import {apiUrl} from "../../baseUrl";

function ConnectRequest(props){

    const connectedUser = useContext(UserContext);
    const history = useHistory()

    function visitUser(){

        fetch(apiUrl+"/user/image?userEmail="+props.connectionRequest.connectSender.email,{
            headers:{
                'Authorization':connectedUser.token
            }
        }).then(response => {
            return response.blob()
        }).then((image) => {

            props.connectionRequest.connectSender.image = image.size ? URL.createObjectURL(image) :
                "https://www.kindpng.com/picc/m/24-248253_user-profile-default-image-png-clipart-png-download.png"
            history.push({
                pathname: '/user/'+props.connectionRequest.connectSender.email,
                state: { userToVisit: props.connectionRequest.connectSender }
            })
        })
    }

    function acceptConnectionRequest(){

        fetch(apiUrl+'/connections/accept?userId='+connectedUser.id+
            "&senderId="+props.connectionRequest.connectSender.id,{
                method:'PUT',
                headers:{
                    'Accept' : 'application/json',
                    'Content-Type' : 'application/json',
                    'Authorization':connectedUser.token
                }
            }
        ).then((response) => {
            if (response.ok) props.requestAnsweredHandler()
        });
    }

    function rejectConnectionRequest(){

        fetch(apiUrl+'/connections/discard?userId='+connectedUser.id+
            "&userToDisconnectId="+props.connectionRequest.connectSender.id,{
                method:'DELETE',
                headers:{
                    'Accept' : 'application/json',
                    'Content-Type' : 'application/json',
                    'Authorization':connectedUser.token
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
                    <ListGroupItem onClick={visitUser}>
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