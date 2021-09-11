import {Button, Container, Form} from "react-bootstrap";
import {useRef} from "react";

function LogIn(props) {

    const emailRef = useRef();
    const passwordRef = useRef();

    function submitLogin(event){

        event.preventDefault();

        const givenEmail = emailRef.current.value;
        const givenPassword = passwordRef.current.value;

        props.onLogin(givenEmail,givenPassword);
    }

    return (

        <Container>
            <Form onSubmit={submitLogin}>
                <h1>Log In</h1>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" ref={emailRef}/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" ref={passwordRef}/>
                </Form.Group>
                <Button type={"submit"}>Submit</Button>
            </Form>
        </Container>
    )
}

export default LogIn;