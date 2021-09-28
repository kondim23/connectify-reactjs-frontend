import {Col, Container, Row , Alert, Form} from "react-bootstrap";
import ListGroupItem from 'react-bootstrap/ListGroupItem'
import {useContext} from "react";
import UserContext from "../../store/user-context";

function ChatMessage(props) {

    const connectedUser = useContext(UserContext);

    if (props.message.messageSender.email === connectedUser.email)
        return (
            <ListGroupItem>
                <Container fluid>
                    <Row>
                        <Col auto/>
                        <Col auto>
                            <Form.Text className="text-muted">
                                {new Date(props.message.date).toLocaleDateString() + ' ' + new Date(props.message.date).toLocaleTimeString() }
                            </Form.Text>
                           <Alert variant={'primary'}>
                               {props.message.message}
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
                            <Form.Text className="text-muted">
                                {new Date(props.message.date).toLocaleDateString() + ' ' + new Date(props.message.date).toLocaleTimeString() }
                            </Form.Text>
                            <Alert variant={'secondary'}>
                                {props.message.message}
                            </Alert>
                        </Col>
                        <Col auto/>
                    </Row>
                </Container>

            </ListGroupItem>
        );

}

export default ChatMessage;