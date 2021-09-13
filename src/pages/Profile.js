import {Button, Card, Col, Container, Form, ListGroup, Row} from "react-bootstrap";
import {useContext, useRef} from "react";
import UserContext from "../store/user-context";

function Profile(){

    const connectedUser = useContext(UserContext);
    const nameRef = useRef();
    const surnameRef = useRef();
    const phoneRef = useRef();
    const experienceRef = useRef();
    const skillRef = useRef();
    const educationRef = useRef();

    function updateUserInfo(event){

        event.preventDefault();

        fetch("http://localhost:8080/user/"+connectedUser.email,{
            method:'PUT',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                isAdmin: connectedUser.isAdmin,
                isLoggedIn: connectedUser.isLoggedIn,
                email: connectedUser.email,
                password: connectedUser.password,
                name: nameRef.current.value ? nameRef.current.value : connectedUser.name,
                surname: surnameRef.current.value ? surnameRef.current.value : connectedUser.surname,
                phone: phoneRef.current.value ? phoneRef.current.value : connectedUser.phone,
                experience: experienceRef.current.value ? experienceRef.current.value : connectedUser.experience,
                skill: skillRef.current.value ? skillRef.current.value : connectedUser.skill,
                education: educationRef.current.value ? educationRef.current.value : connectedUser.education
            })
        }).then(() => connectedUser.setUserInfo({
            isAdmin: connectedUser.isAdmin,
            isLoggedIn: connectedUser.isLoggedIn,
            email: connectedUser.email,
            password: connectedUser.password,
            name: nameRef.current.value ? nameRef.current.value : connectedUser.name,
            surname: surnameRef.current.value ? surnameRef.current.value : connectedUser.surname,
            phone: phoneRef.current.value ? phoneRef.current.value : connectedUser.phone,
            experience: experienceRef.current.value ? experienceRef.current.value : connectedUser.experience,
            skill: skillRef.current.value ? skillRef.current.value : connectedUser.skill,
            education: educationRef.current.value ? educationRef.current.value : connectedUser.education
        }))


    }

    return (
        <Container>
            <Row>
                <Col lg={3}>
                    <Card style={{ width: '18rem' } }>
                        <Card.Img variant="top" src="https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg" />
                        <Card.Body>
                            <Form>
                                <Form.Group controlId="formFile" className="mb-3">
                                    <Form.Label>Add a new profile photo:</Form.Label>
                                    <Form.Control type="file" />
                                </Form.Group>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
                <Col lg={9}>
                    <Card>
                        <Card.Body>
                            <Form onSubmit={updateUserInfo}>
                                <Form.Text>Name:</Form.Text>
                                <Form.Control type="text"
                                              placeholder={connectedUser.name ? connectedUser.name : "Add your name here"}
                                              ref={nameRef}/>
                                <Form.Text>Surname:</Form.Text>
                                <Form.Control type="text"
                                              placeholder={connectedUser.surname ? connectedUser.surname : "Add your surname here"}
                                              ref={surnameRef}/>
                                <Form.Text>Phone:</Form.Text>
                                <Form.Control type="text"
                                              placeholder={connectedUser.phone ? connectedUser.phone : "Add your phone here"}
                                              ref={phoneRef}/>
                                <Form.Text>Education:</Form.Text>
                                <Form.Control type="text"
                                              placeholder={connectedUser.education ? connectedUser.education : "Add your education here"}
                                              ref={educationRef}/>
                                <Form.Text>Experience:</Form.Text>
                                <Form.Control type="text"
                                              placeholder={connectedUser.experience ? connectedUser.experience : "Add your experience here"}
                                              ref={experienceRef}/>
                                <Form.Text>Skill:</Form.Text>
                                <Form.Control type="text"
                                              placeholder={connectedUser.skill ? connectedUser.skill : "Add your skill here"}
                                              ref={skillRef}/>
                                <Button type={"submit"}
                                        variant="outline-secondary"
                                        id="button-addon2"
                                        style={{marginTop:'20px'}}>
                                    Update
                                </Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}

export default Profile;