import {Button, Card, Container, Form} from "react-bootstrap";
import {useContext, useRef} from "react";
import UserContext from "../store/user-context";

function Settings(){

    const connectedUser = useContext(UserContext);

    const emailRef = useRef();
    const passwordRef = useRef();

    function updateUserInfo(event){

        event.preventDefault();

        const userInfo = {
            isAdmin: connectedUser.isAdmin,
            isLoggedIn: connectedUser.isLoggedIn,
            email: emailRef.current.value ? emailRef.current.value : connectedUser.email,
            password: passwordRef.current.value ? passwordRef.current.value : connectedUser.password,
            name: connectedUser.name,
            surname: connectedUser.surname,
            phone: connectedUser.phone,
            experience: connectedUser.experience,
            skill: connectedUser.skill,
            education: connectedUser.education,
        }

        fetch("http://localhost:8080/user/"+connectedUser.email,{
            method:'PUT',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify(userInfo)
        }).then(() => {
            emailRef.current.value=null;
            passwordRef.current.value=null;
            connectedUser.setUserInfo(userInfo)
        })

    }

    return (
        <Container>
            <Card>
                <Card.Header>Change your privacy settings:</Card.Header>
                <Card.Body>
                    <Form onSubmit={updateUserInfo}>
                        <Form.Text>Email:</Form.Text>
                        <Form.Control type="email" placeholder={connectedUser.email} ref={emailRef}/>
                        <Form.Text>Password:</Form.Text>
                        <Form.Control type="password" placeholder="Enter your new password" ref={passwordRef}/>
                        <Button type={"submit"} variant="outline-secondary" id="button-addon2" style={{marginTop:'20px'}}>
                            Update
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    )
}

export default Settings;