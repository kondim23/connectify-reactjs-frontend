import {Button, Container, Form} from "react-bootstrap";
import {useRef} from "react";

function SignUp(props) {

    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmationRef = useRef();
    const nameRef = useRef();
    const surnameRef = useRef();

    function submitSignUp(event){

        event.preventDefault();

        const givenEmail = emailRef.current.value;
        const givenPassword = passwordRef.current.value;
        const givenConfPass = passwordConfirmationRef.current.value;
        const givenName = nameRef.current.value;
        const givenSurname = surnameRef.current.value;

        const signUpData={
            email:givenEmail,
            password:givenPassword,
            confirmationPass:givenConfPass,
            name:givenName,
            surname: givenSurname
        }

        props.onSignup(signUpData);

    }

    return (
        <Container>
                <Form onSubmit={submitSignUp}>
                    <h1>Sign Up</h1>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" ref={emailRef}/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" ref={passwordRef}/>
                        <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                        </Form.Text>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" ref={passwordConfirmationRef}/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter email" ref={nameRef}/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Surname</Form.Label>
                        <Form.Control type="text" placeholder="Enter email" ref={surnameRef}/>
                    </Form.Group>
                    <Button type={'submit'}>Submit</Button>
                </Form>
        </Container>
    )
}

export default SignUp;