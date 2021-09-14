import {Card, Col, Container, Form, Row} from "react-bootstrap";
import {useContext} from "react";
import UserToVisitContext from "../store/userToVisit-context";

function UserProfile(){

    const visitor = useContext(UserToVisitContext);

    return (
        <Container>
            <Row>
                <Col lg={3}>
                    <Card style={{ width: '18rem' } }>
                        <Card.Img src="https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg" />
                    </Card>
                </Col>
                <Col>
                    <Card>
                        <Card.Header>{visitor.name+" "+visitor.surname}</Card.Header>
                        <Card.Body>
                            <Form.Text>Email:</Form.Text>
                            <Card.Text>{visitor.email}</Card.Text>
                            {visitor.phone ?
                                <div>
                                    <Form.Text>Phone:</Form.Text>
                                    <Card.Text>{visitor.phone}</Card.Text>
                                </div> : false
                            }
                            {!visitor.privacyEdu && visitor.education ?
                                <div>
                                    <Form.Text>education:</Form.Text>
                                    <Card.Text>{visitor.education}</Card.Text>
                                </div> : false
                            }
                            {!visitor.privacyExp && visitor.experience ?
                                <div>
                                    <Form.Text>Experience:</Form.Text>
                                    <Card.Text>{visitor.experience}</Card.Text>
                                </div> : false
                            }
                            {!visitor.privacySk && visitor.skill ?
                                <div>
                                    <Form.Text>Skills:</Form.Text>
                                    <Card.Text>{visitor.skill}</Card.Text>
                                </div> : false
                            }
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}

export default UserProfile;