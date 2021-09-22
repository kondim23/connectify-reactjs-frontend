import {Col, Container, Row, Card} from "react-bootstrap";
import {useContext,useEffect, useState} from "react";
import ChatterList from "../Components/Messaging/ChatterList"
import ChatList from "../Components/Messaging/ChatList"
import NewMessage from "../Components/Messaging/NewMessage"
import UserContext from "../store/user-context";
import {apiUrl} from "../baseUrl";


function Messaging(props) {
    
    const [isLoadingChatters, setIsLoadingChatters] = useState(true);
    const [loadedChatters, setLoadedChatters] = useState([]);
    const [isLoadingChat, setIsLoadingChat] = useState(true);
    const [loadedChat, setLoadedChat] = useState([]);
    const [loadedChatter, setLoadedChatter] = useState([]);
   
    const connectedUser = useContext(UserContext);
    
    function chatHandler(chatter) {

        setIsLoadingChat(true);
        setLoadedChatter(chatter);
        if (chatter == null) {
            setIsLoadingChat(false);
            setLoadedChat([]);
            return ;
        }
        fetch( apiUrl + "/messages/" + connectedUser.email + "?connectedEmail="+ chatter.email,{
            headers : {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization':connectedUser.token
            }
        }).then((response1) => {
            return  response1.json();
        }).then((dataChat) => {
            setIsLoadingChat(false);
            setLoadedChat(dataChat);
        });
        
    }

    useEffect(() => {
        setIsLoadingChatters(true);
        fetch( apiUrl + "/messages/chatters/" + connectedUser.email ,{
            headers : {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization':connectedUser.token
            }
        }).then((response) => {
            return  response.json();
        }).then((data) => {
            let i=0;
            if (props.location.state!=null) {
                for (const user of data) {
                    if (user.email === props.location.state.user.email) break;
                    i++;
                }
                if (i === data.length) {
                    data = [props.location.state.user, ...data]
                    i=0;
                }
            }
            setIsLoadingChatters(false);
            setLoadedChatters(data);
            chatHandler(data[i]);
        });
    },[]);

    return (
        <Container>
            <Row>
                <Col xs={3} auto>
                    {isLoadingChatters ?
                        false :
                        loadedChatters.length===0 ?
                            <p>You have no contacts yet!</p> :
                            <ChatterList chatters={loadedChatters} handler={chatHandler} /> }
                </Col>
                <Col xs={8}>
                    {isLoadingChat ?
                        false :
                        (loadedChatters.length===0) ?
                            <p>You have no messages yet!</p> :
                            <Container>
                                <ChatList chat={loadedChat} />
                                <NewMessage chatter={loadedChatter} handler={chatHandler} />
                            </Container>
                    }
                </Col>
            </Row>
        </Container>
    )
}

export default Messaging;
