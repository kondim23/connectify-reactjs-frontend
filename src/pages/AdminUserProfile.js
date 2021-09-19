import {useContext} from "react";
import UserToVisitContext from "../store/userToVisit-context";
import {Card, Col, Container, Form, Row} from "react-bootstrap";

function AdminUserProfile(){

    const userToVisit = useContext(UserToVisitContext);

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
                            {userToVisit.education ?
                                <div>
                                    <Form.Text>education:</Form.Text>
                                    <Card.Text>{userToVisit.education}</Card.Text>
                                </div> : false
                            }
                            {userToVisit.experience ?
                                <div>
                                    <Form.Text>Experience:</Form.Text>
                                    <Card.Text>{userToVisit.experience}</Card.Text>
                                </div> : false
                            }
                            {userToVisit.skills ?
                                <div>
                                    <Form.Text>Skills:</Form.Text>
                                    <Card.Text>{userToVisit.skills}</Card.Text>
                                </div> : false
                            }
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}
export default AdminUserProfile;