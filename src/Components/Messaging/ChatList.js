import ChatMessage from "./ChatMessage"
import {ListGroup,Card} from 'react-bootstrap'

function ChatList(props) {
    
    return (
        <Card style={{height:'37rem',overflowY:'auto'}}>
            <ListGroup>
                {props.chat.map(chatMessage => <ChatMessage message={chatMessage}/>)}
            </ListGroup>
        </Card>

    );
}

export default ChatList;