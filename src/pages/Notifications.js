import {Card, Container, Row} from "react-bootstrap";
import {useContext, useEffect, useState} from "react";
import UserContext from "../store/user-context";
import ConnectRequestList from "../Components/ConnectRequestList";
import LikeCommentList from "../Components/LikeCommentList";

function Notifications(){

    const connectedUser = useContext(UserContext);

    const [isLoadingConnectRequest, setIsLoadingConnectRequest] = useState(true);
    const [connectRequests, setConnectRequests] = useState([]);
    const [isLoadingLikeComments, setIsLoadingLikeComments] = useState(true);
    const [likeComment, setLikeComments] = useState([]);

    useEffect(() => {
        setIsLoadingConnectRequest(true);
        fetch("http://localhost:8080/connections/pending/"+connectedUser.email,{
            headers : {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }).then((response) => {
            return  response.json();
        }).then((data) => {
            setIsLoadingConnectRequest(false);
            setConnectRequests(data);
        });

        setIsLoadingLikeComments(true);
        fetch("http://localhost:8080/notifications/likecomment?userEmail="+connectedUser.email,{
            headers : {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }).then((response) => {
            return  response.json();
        }).then((data) => {
            setIsLoadingLikeComments(false);
            setLikeComments(data);
        });
    },[]);

    return (
        <Container>
            <Row style={{overflowY:'scroll',marginBottom: '25px'}}>
                <Card style={{height:'25rem'}}>
                    <Card.Header>Your connection requests:</Card.Header>
                    {isLoadingConnectRequest ? false : <ConnectRequestList connectRequests={connectRequests}/>}
                </Card>
            </Row>
            <Row style={{overflowY:'scroll'}}>
                <Card style={{height:'25rem'}}>
                    <Card.Header>Your latest notifications::</Card.Header>
                    {isLoadingLikeComments ? false : <LikeCommentList notifications={likeComment}/>}
                </Card>
            </Row>
        </Container>
    )
}

export default Notifications;