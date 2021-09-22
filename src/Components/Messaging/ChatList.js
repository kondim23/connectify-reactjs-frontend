import ChatMessage from "./ChatMessage"
import {ListGroup,Card} from 'react-bootstrap'

function ChatList(props) {
    
    return (
        <Card style={{height:'37rem',overflowY:'scroll'}}>
            <ListGroup>
                {props.chat.map(chatMessage => <ChatMessage sender={chatMessage.messageSender} text={chatMessage.message}/>)}
            </ListGroup>
        </Card>

    );
}

export default ChatList;