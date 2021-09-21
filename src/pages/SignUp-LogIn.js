import {Card, Col, Container, Row} from "react-bootstrap";
import LogIn from "../Components/SignUp-Login/LogIn";
import SignUp from "../Components/SignUp-Login/SignUp";
import {useContext} from "react";
import {Redirect} from "react-router-dom";
import UserContext from "../store/user-context";
import {apiUrl} from "../baseUrl";

function SignUpLogIn() {

    const connectedUserContext = useContext(UserContext);

    function logInHandler(givenEmail, givenPassword){

        fetch(apiUrl+"/login",{
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                'email':givenEmail,
                'password':givenPassword
            }),
            method:'POST'
        }).then((response) => {
            return response.headers.has('Authorization') ? response.headers.get('Authorization') : null
        }).then((token)=> {

            // fetch(apiUrl+"/signin?userEmail=" + givenEmail + "&userPass=" + givenPassword, {
            //     headers: {
            //         'Content-Type': 'application/json',
            //         'Accept': 'application/json',
            //         'Authorization':token
            //     }
            // }).then((response) => {
            //     return response.text();
            // }).then((userInfo) => {
                if (givenEmail === 'admin@mail.com') {
                    const userInfoToSave = {
                        isLoggedIn: true,
                        isAdmin: true,
                        email: givenEmail,
                        password: givenPassword,
                        token:token,
                        name: null,
                        surname: null,
                        phone: null,
                        image: null,
                        education: null,
                        skills: null,
                        experience: null,
                        privacyExp: true,
                        privacyEdu: true,
                        privacySk: true,
                    }
                    connectedUserContext.setUserInfo(userInfoToSave);
                    localStorage.setItem('connectedUser', JSON.stringify(userInfoToSave))
                    return <Redirect to={'/'}/>;
                }
                else {

                    fetch(apiUrl+"/user?userEmail=" + givenEmail, {
                        headers: {
                            'Content-Type': 'application/json',
                            'Accept': 'application/json',
                            'Authorization':token
                        }
                    }).then((response) => {
                        return response.json();
                    }).then((userInfo) => {

                        fetch(apiUrl+"/user/image?userEmail=" + givenEmail, {
                            headers: {
                                'Authorization':token
                            }
                        }).then(response => {
                            return response.blob()
                        }).then(data => {
                            const userInfoToSave ={
                                isLoggedIn: true,
                                isAdmin: false,
                                id: userInfo.id,
                                email: givenEmail,
                                password: givenPassword,
                                token:token,
                                name: userInfo.name,
                                surname: userInfo.surname,
                                phone: userInfo.phone,
                                image: URL.createObjectURL(data),
                                education: userInfo.education,
                                skills: userInfo.skills,
                                experience: userInfo.experience,
                                privacyExp: userInfo.privacyExp,
                                privacyEdu: userInfo.privacyEdu,
                                privacySk: userInfo.privacySk
                            }
                            connectedUserContext.setUserInfo(userInfoToSave);
                            localStorage.setItem('connectedUser', JSON.stringify(userInfoToSave))
                            return <Redirect to={'/'}/>;
                        })
                    });
                }
            });
    }

    function signUpHandler(signUpData){

        if (signUpData.password!==signUpData.confirmationPass) return <Redirect to ='/'/>;

        fetch(apiUrl+"/users/new-user",{
            method:'POST',
            headers:{
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body:JSON.stringify(signUpData)
        }).then((response) => {
            if (response.ok) logInHandler(signUpData.email,signUpData.password)
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