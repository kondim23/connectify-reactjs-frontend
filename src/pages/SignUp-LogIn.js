import {Card, Col, Container, Row} from "react-bootstrap";
import LogIn from "../Components/LogIn";
import SignUp from "../Components/SignUp";
import {useContext} from "react";
import {Redirect} from "react-router-dom";
import UserContext from "../store/user-context";

function SignUpLogIn() {

    const connectedUserContext = useContext(UserContext);

    function logInHandler(givenEmail, givenPassword){

        fetch("http://localhost:8080/signin?userEmail="+givenEmail+"&userPass="+givenPassword,{
            headers:{
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }).then((response) => {return response.text();
        }).then((userInfo) =>
        {
            if (userInfo==='Admin') {
                connectedUserContext.setUserInfo({
                    isLoggedIn: true,
                    isAdmin: true,
                    email: givenEmail,
                    password: givenPassword,
                    name: null,
                    surname: null,
                    phone: null,
                    image:null,
                    education: null,
                    skill: null,
                    experience: null,
                    privacyExp: true,
                    privacyEdu: true,
                    privacySk: true,
                });
                return <Redirect to={'/'}/>;
            }
            else if (userInfo==='User'){

                fetch("http://localhost:8080/user?userEmail="+givenEmail,{
                    headers:{
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    }
                }).then((response) => {return response.json();
                }).then((userInfo) => {
                    connectedUserContext.setUserInfo({
                        isLoggedIn: true,
                        isAdmin: false,
                        email: givenEmail,
                        password: givenPassword,
                        name: userInfo.name,
                        surname: userInfo.surname,
                        phone: userInfo.phone,
                        image: null,
                        education: userInfo.education,
                        skill: userInfo.skill,
                        experience: userInfo.experience,
                        privacyExp: userInfo.privacyExp,
                        privacyEdu: userInfo.privacyEdu,
                        privacySk: userInfo.privacySk
                    });
                    return <Redirect to={'/'}/>;
                });
            }
        });
    }

    function signUpHandler(signUpData){

        if (signUpData.password!==signUpData.confirmationPass) return <Redirect to ='/'/>;

        fetch("http://localhost:8080/users",{
            method:'POST',
            headers:{
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body:JSON.stringify(signUpData)
        }).then((response) => {

            if (response.ok) {
                connectedUserContext.setUserInfo({
                    isLoggedIn: true,
                    isAdmin: false,
                    email: signUpData.email,
                    password: signUpData.password,
                    name: signUpData.name,
                    surname: signUpData.surname,
                    phone: null,
                    image:null,
                    education: null,
                    skill: null,
                    experience: null,
                    privacyExp: true,
                    privacyEdu: true,
                    privacySk: true
                })
            }

            return <Redirect to={'/'}/>;
        })
    }

    return (
        <Container fluid>
            <Card style={{marginTop:'30px'}}>
                <Card.Header><Card.Title>Welcome to Linked In!</Card.Title></Card.Header>
                <Card.Body>
                    <Row>
                        <Col>
                            <LogIn onLogin={logInHandler}/>
                        </Col>
                        <Col>
                            <SignUp onSignup={signUpHandler}/>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
        </Container>
    )
}

export default SignUpLogIn;