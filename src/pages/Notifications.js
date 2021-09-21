import {Card, Container, Row} from "react-bootstrap";
import {useContext, useEffect, useState} from "react";
import UserContext from "../store/user-context";
import ConnectRequestList from "../Components/Notifications/ConnectRequestList";
import LikeCommentList from "../Components/Notifications/LikeCommentList";
import {apiUrl} from "../baseUrl";

function Notifications(){

    const connectedUser = useContext(UserContext);

    const [isLoadingConnectRequest, setIsLoadingConnectRequest] = useState(true);
    const [connectRequests, setConnectRequests] = useState([]);
    const [isLoadingLikeComments, setIsLoadingLikeComments] = useState(true);
    const [likeComment, setLikeComments] = useState([]);

    function getConnectionRequests(){
        setIsLoadingConnectRequest(true);
        fetch(apiUrl+"/connections/pending/"+connectedUser.email,{
            headers : {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization':connectedUser.token
            }
        }).then((response) => {
            return  response.json();
        }).then((data) => {
            setIsLoadingConnectRequest(false);
            setConnectRequests(data);
        });
    }

    function getLikeCommentNotifications(){
        setIsLoadingLikeComments(true);
        fetch(apiUrl+"/notifications/likecomment?userEmail="+connectedUser.email,{
            headers : {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization':connectedUser.token
            }
        }).then((response) => {
            return  response.json();
        }).then((data) => {
            setIsLoadingLikeComments(false);
            setLikeComments(data);
        });
    }

    useEffect(() => {
        getConnectionRequests();
        getLikeCommentNotifications();
    },[]);

    return (
        <Container>
            <Row style={{marginBottom: '25px'}}>
                <Card style={{height:'25rem'}}>
                    <Row style={{overflowY:'scroll'}}>
                        <Card.Header>Your connection requests:</Card.Header>
                        {isLoadingConnectRequest ? false : <ConnectRequestList connectRequests={connectRequests}
                                                                               requestAnsweredHandler={getConnectionRequests}/>}
                    </Row>
                </Card>
            </Row>
            <Row>
                <Card style={{height:'25rem'}}>
                    <Row style={{overflowY:'scroll'}}>
                        <Card.Header>Your latest notifications::</Card.Header>
                        {isLoadingLikeComments ? false : <LikeCommentList notifications={likeComment}/>}
                    </Row>
                </Card>
            </Row>
        </Container>
    )
}

export default Notifications;