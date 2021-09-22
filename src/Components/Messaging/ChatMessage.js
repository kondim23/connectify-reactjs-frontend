import {Col, Container, Row , Alert} from "react-bootstrap";
import ListGroupItem from 'react-bootstrap/ListGroupItem'
import {useContext} from "react";
import UserContext from "../../store/user-context";

function ChatMessage(props) {

    const connectedUser = useContext(UserContext);

    if (props.sender.email === connectedUser.email)
        return (
            <ListGroupItem>
                <Container fluid>
                    <Row>
                        <Col auto/>
                        <Col auto>
                           <Alert variant={'primary'}>
                               {props.text}
                           </Alert>
                        </Col>
                    </Row>
                </Container>
            </ListGroupItem>
        );
    else
        return (
            <ListGroupItem>
                <Container fluid>
                    <Row>
                        <Col auto>
                            <Alert variant={'primary'}>
                                {props.text}
                            </Alert>
                        </Col>
                        <Col auto/>
                    </Row>
                </Container>

            </ListGroupItem>
        );

}

export default ChatMessage;