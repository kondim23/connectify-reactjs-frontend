import {Alert, Card, Col, Container, Row} from "react-bootstrap";
import LogIn from "../Components/SignUp-Login/LogIn";
import SignUp from "../Components/SignUp-Login/SignUp";
import {useContext, useState} from "react";
import UserContext from "../store/user-context";
import {apiUrl} from "../baseUrl";

function SignUpLogIn() {

    const connectedUserContext = useContext(UserContext);
    const [userDoesNotExistAlert, setUserDoesNotExistAlert] = useState(null);
    const [userAlreadyExistsAlert, setUserAlreadyExistsAlert] = useState(null);
    const [passwordConfirmationAlert, setPasswordConfirmationAlert] = useState(null);

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

            if (token==null) {

                setUserDoesNotExistAlert(
                    <Alert variant={"danger"}>
                        Wrong Email or Password provided.
                    </Alert>
                );
                return;
            }
            if (givenEmail === 'admin@mail.com') {
                const userInfoToSave = {
                    isLoggedIn: true,
                    isAdmin: true,
                    email: givenEmail,
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
                            token:token,
                            name: userInfo.name,
                            surname: userInfo.surname,
                            phone: userInfo.phone,
                            image: data.size ? URL.createObjectURL(data) : "https://www.kindpng.com/picc/m/24-248253_user-profile-default-image-png-clipart-png-download.png",
                            education: userInfo.education,
                            skills: userInfo.skills,
                            experience: userInfo.experience,
                            privacyExp: userInfo.privacyExp,
                            privacyEdu: userInfo.privacyEdu,
                            privacySk: userInfo.privacySk
                        }
                        connectedUserContext.setUserInfo(userInfoToSave);
                        localStorage.setItem('connectedUser', JSON.stringify(userInfoToSave))
                    })
                });
            }
        });
    }

    function signUpHandler(signUpData){

        if (signUpData.password!==signUpData.confirmationPass) {

            setPasswordConfirmationAlert(
                <Alert variant={"danger"}>
                    'Password' and 'Confirm Password' entries are not the same.
                </Alert>
            )
        }

        fetch(apiUrl+"/users/new-user",{
            method:'POST',
            headers:{
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body:JSON.stringify(signUpData)
        }).then((response) => {
            if (response.ok) logInHandler(signUpData.email,signUpData.password)
            else setUserAlreadyExistsAlert(
                <Alert variant={"danger"}>
                    A user with email {signUpData.email} already exists.
                </Alert>
            )
        })
    }

    return (
        <Container fluid>
            <Card style={{marginTop:'30px'}}>
                <Card.Header><Card.Title>Welcome to Connectify</Card.Title></Card.Header>
                <Card.Body>
                    <Row>
                        <Col>
                            {userDoesNotExistAlert ? userDoesNotExistAlert : false}
                            <LogIn onLogin={logInHandler}/>
                        </Col>
                        <Col>
                            {userAlreadyExistsAlert ? userAlreadyExistsAlert : false}
                            {passwordConfirmationAlert ? passwordConfirmationAlert : false}
                            <SignUp onSignup={signUpHandler}/>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
        </Container>
    )
}

export default SignUpLogIn;