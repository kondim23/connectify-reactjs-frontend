import {Button, Card, Col, Container, Form, InputGroup, ListGroup, OverlayTrigger, Row, Tooltip} from "react-bootstrap";
import {useContext, useRef, useState} from "react";
import UserContext from "../store/user-context";

function Profile(){

    const connectedUser = useContext(UserContext);

    const nameRef = useRef();
    const surnameRef = useRef();
    const phoneRef = useRef();
    const experienceRef = useRef();
    const skillRef = useRef();
    const educationRef = useRef();

    const [isPrivateEdu, setIsPrivateEdu] = useState(connectedUser.privacyEdu);
    const [isPrivateExp, setIsPrivateExp] = useState(connectedUser.privacyExp);
    const [isPrivateSk, setIsPrivateSk] = useState(connectedUser.privacySk);

    function updateUserInfo(event){

        event.preventDefault();

        const userInfo = {
            isAdmin: connectedUser.isAdmin,
            isLoggedIn: connectedUser.isLoggedIn,
            email: connectedUser.email,
            password: connectedUser.password,
            name: nameRef.current.value ? nameRef.current.value : connectedUser.name,
            surname: surnameRef.current.value ? surnameRef.current.value : connectedUser.surname,
            phone: phoneRef.current.value ? phoneRef.current.value : connectedUser.phone,
            experience: experienceRef.current.value ? experienceRef.current.value : connectedUser.experience,
            skill: skillRef.current.value ? skillRef.current.value : connectedUser.skill,
            education: educationRef.current.value ? educationRef.current.value : connectedUser.education,
            privacyEdu: isPrivateEdu,
            privacyExp: isPrivateExp,
            privacySk: isPrivateSk
        }

        fetch("http://localhost:8080/user/"+connectedUser.email,{
            method:'PUT',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify(userInfo)
        }).then(() => connectedUser.setUserInfo(userInfo))


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
                                <InputGroup>
                                    <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Your info is {isPrivateEdu ? "Private" : "Public"}</Tooltip>}>
                                        <InputGroup.Text>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                             className="bi bi-lock" viewBox="0 0 16 16">
                                            {isPrivateEdu
                                                ? <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2zM5 8h6a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1z"/>
                                                : <path d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm7.5-6.923c-.67.204-1.335.82-1.887 1.855A7.97 7.97 0 0 0 5.145 4H7.5V1.077zM4.09 4a9.267 9.267 0 0 1 .64-1.539 6.7 6.7 0 0 1 .597-.933A7.025 7.025 0 0 0 2.255 4H4.09zm-.582 3.5c.03-.877.138-1.718.312-2.5H1.674a6.958 6.958 0 0 0-.656 2.5h2.49zM4.847 5a12.5 12.5 0 0 0-.338 2.5H7.5V5H4.847zM8.5 5v2.5h2.99a12.495 12.495 0 0 0-.337-2.5H8.5zM4.51 8.5a12.5 12.5 0 0 0 .337 2.5H7.5V8.5H4.51zm3.99 0V11h2.653c.187-.765.306-1.608.338-2.5H8.5zM5.145 12c.138.386.295.744.468 1.068.552 1.035 1.218 1.65 1.887 1.855V12H5.145zm.182 2.472a6.696 6.696 0 0 1-.597-.933A9.268 9.268 0 0 1 4.09 12H2.255a7.024 7.024 0 0 0 3.072 2.472zM3.82 11a13.652 13.652 0 0 1-.312-2.5h-2.49c.062.89.291 1.733.656 2.5H3.82zm6.853 3.472A7.024 7.024 0 0 0 13.745 12H11.91a9.27 9.27 0 0 1-.64 1.539 6.688 6.688 0 0 1-.597.933zM8.5 12v2.923c.67-.204 1.335-.82 1.887-1.855.173-.324.33-.682.468-1.068H8.5zm3.68-1h2.146c.365-.767.594-1.61.656-2.5h-2.49a13.65 13.65 0 0 1-.312 2.5zm2.802-3.5a6.959 6.959 0 0 0-.656-2.5H12.18c.174.782.282 1.623.312 2.5h2.49zM11.27 2.461c.247.464.462.98.64 1.539h1.835a7.024 7.024 0 0 0-3.072-2.472c.218.284.418.598.597.933zM10.855 4a7.966 7.966 0 0 0-.468-1.068C9.835 1.897 9.17 1.282 8.5 1.077V4h2.355z"/>
                                            }
                                        </svg>
                                        </InputGroup.Text>
                                    </OverlayTrigger>
                                    <Form.Control type="text"
                                              placeholder={connectedUser.education ? connectedUser.education : "Add your education here"}
                                              ref={educationRef}/>
                                    <Button variant="outline-secondary" id="button-addon2" style={{width:'8rem'}}
                                            onClick={() => {isPrivateEdu ? setIsPrivateEdu(false) : setIsPrivateEdu(true)}}>
                                        {isPrivateEdu ? "Make Public" : "Make Private"}
                                    </Button>
                                </InputGroup>
                                <Form.Text>Experience:</Form.Text>
                                <InputGroup>
                                    <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Your info is {isPrivateExp ? "Private" : "Public"}</Tooltip>}>
                                        <InputGroup.Text>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                                 className="bi bi-lock" viewBox="0 0 16 16">
                                                {isPrivateExp
                                                    ? <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2zM5 8h6a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1z"/>
                                                    : <path d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm7.5-6.923c-.67.204-1.335.82-1.887 1.855A7.97 7.97 0 0 0 5.145 4H7.5V1.077zM4.09 4a9.267 9.267 0 0 1 .64-1.539 6.7 6.7 0 0 1 .597-.933A7.025 7.025 0 0 0 2.255 4H4.09zm-.582 3.5c.03-.877.138-1.718.312-2.5H1.674a6.958 6.958 0 0 0-.656 2.5h2.49zM4.847 5a12.5 12.5 0 0 0-.338 2.5H7.5V5H4.847zM8.5 5v2.5h2.99a12.495 12.495 0 0 0-.337-2.5H8.5zM4.51 8.5a12.5 12.5 0 0 0 .337 2.5H7.5V8.5H4.51zm3.99 0V11h2.653c.187-.765.306-1.608.338-2.5H8.5zM5.145 12c.138.386.295.744.468 1.068.552 1.035 1.218 1.65 1.887 1.855V12H5.145zm.182 2.472a6.696 6.696 0 0 1-.597-.933A9.268 9.268 0 0 1 4.09 12H2.255a7.024 7.024 0 0 0 3.072 2.472zM3.82 11a13.652 13.652 0 0 1-.312-2.5h-2.49c.062.89.291 1.733.656 2.5H3.82zm6.853 3.472A7.024 7.024 0 0 0 13.745 12H11.91a9.27 9.27 0 0 1-.64 1.539 6.688 6.688 0 0 1-.597.933zM8.5 12v2.923c.67-.204 1.335-.82 1.887-1.855.173-.324.33-.682.468-1.068H8.5zm3.68-1h2.146c.365-.767.594-1.61.656-2.5h-2.49a13.65 13.65 0 0 1-.312 2.5zm2.802-3.5a6.959 6.959 0 0 0-.656-2.5H12.18c.174.782.282 1.623.312 2.5h2.49zM11.27 2.461c.247.464.462.98.64 1.539h1.835a7.024 7.024 0 0 0-3.072-2.472c.218.284.418.598.597.933zM10.855 4a7.966 7.966 0 0 0-.468-1.068C9.835 1.897 9.17 1.282 8.5 1.077V4h2.355z"/>
                                                }
                                            </svg>
                                        </InputGroup.Text>
                                    </OverlayTrigger>
                                    <Form.Control type="text"
                                                  placeholder={connectedUser.experience ? connectedUser.experience : "Add your education here"}
                                                  ref={experienceRef}/>
                                    <Button variant="outline-secondary" id="button-addon2" style={{width:'8rem'}}
                                            onClick={() => {isPrivateExp ? setIsPrivateExp(false) : setIsPrivateExp(true)}}>
                                        {isPrivateExp ? "Make Public" : "Make Private"}
                                    </Button>
                                </InputGroup>
                                <Form.Text>Skill:</Form.Text>
                                <InputGroup>
                                    <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Your info is {isPrivateSk ? "Private" : "Public"}</Tooltip>}>
                                        <InputGroup.Text>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                                 className="bi bi-lock" viewBox="0 0 16 16">
                                                {isPrivateSk
                                                    ? <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2zM5 8h6a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1z"/>
                                                    : <path d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm7.5-6.923c-.67.204-1.335.82-1.887 1.855A7.97 7.97 0 0 0 5.145 4H7.5V1.077zM4.09 4a9.267 9.267 0 0 1 .64-1.539 6.7 6.7 0 0 1 .597-.933A7.025 7.025 0 0 0 2.255 4H4.09zm-.582 3.5c.03-.877.138-1.718.312-2.5H1.674a6.958 6.958 0 0 0-.656 2.5h2.49zM4.847 5a12.5 12.5 0 0 0-.338 2.5H7.5V5H4.847zM8.5 5v2.5h2.99a12.495 12.495 0 0 0-.337-2.5H8.5zM4.51 8.5a12.5 12.5 0 0 0 .337 2.5H7.5V8.5H4.51zm3.99 0V11h2.653c.187-.765.306-1.608.338-2.5H8.5zM5.145 12c.138.386.295.744.468 1.068.552 1.035 1.218 1.65 1.887 1.855V12H5.145zm.182 2.472a6.696 6.696 0 0 1-.597-.933A9.268 9.268 0 0 1 4.09 12H2.255a7.024 7.024 0 0 0 3.072 2.472zM3.82 11a13.652 13.652 0 0 1-.312-2.5h-2.49c.062.89.291 1.733.656 2.5H3.82zm6.853 3.472A7.024 7.024 0 0 0 13.745 12H11.91a9.27 9.27 0 0 1-.64 1.539 6.688 6.688 0 0 1-.597.933zM8.5 12v2.923c.67-.204 1.335-.82 1.887-1.855.173-.324.33-.682.468-1.068H8.5zm3.68-1h2.146c.365-.767.594-1.61.656-2.5h-2.49a13.65 13.65 0 0 1-.312 2.5zm2.802-3.5a6.959 6.959 0 0 0-.656-2.5H12.18c.174.782.282 1.623.312 2.5h2.49zM11.27 2.461c.247.464.462.98.64 1.539h1.835a7.024 7.024 0 0 0-3.072-2.472c.218.284.418.598.597.933zM10.855 4a7.966 7.966 0 0 0-.468-1.068C9.835 1.897 9.17 1.282 8.5 1.077V4h2.355z"/>
                                                }
                                            </svg>
                                        </InputGroup.Text>
                                    </OverlayTrigger>
                                    <Form.Control type="text"
                                                  placeholder={connectedUser.skill ? connectedUser.skill : "Add your education here"}
                                                  ref={skillRef}/>
                                    <Button variant="outline-secondary" id="button-addon2" style={{width:'8rem'}}
                                            onClick={() => {isPrivateSk ? setIsPrivateSk(false) : setIsPrivateSk(true)}}>
                                        {isPrivateSk ? "Make Public" : "Make Private"}
                                    </Button>
                                </InputGroup>
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