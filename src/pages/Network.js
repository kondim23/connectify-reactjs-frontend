import {Button, Container, Form, FormControl, InputGroup, Row} from "react-bootstrap";
import {useContext, useEffect, useRef, useState} from "react";
import UserList from "../Components/Network/UserList";
import UserContext from "../store/user-context";
import {apiUrl} from "../baseUrl";

function Network(){

    const connectedUser = useContext(UserContext);

    const searchDataRef = useRef();
    const [isLoading, setIsLoading] = useState(true);
    const [usersPreview, setUsersPreview] = useState([]);

    function getImagesOfUsers(users){

        const requests = users.map((user) => {
            return fetch(apiUrl+"/user/image?userEmail="+user.email,{
                headers:{
                    'Authorization':connectedUser.token
                }
            }).then(response => {
                return response.blob()
            }).then((image) => {
                user.image=image.size ? URL.createObjectURL(image) : "https://www.kindpng.com/picc/m/24-248253_user-profile-default-image-png-clipart-png-download.png"
            })
        })
        Promise.allSettled(requests).then(()=>{
            setUsersPreview(users)
            setIsLoading(false);
        })
    }

    function searchSubmit(event){

        event.preventDefault();

        setIsLoading(true);
        fetch(apiUrl+"/search/"+searchDataRef.current.value,{
            headers:{
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization':connectedUser.token
            }
        }).then((response) => {
            return response.json();
        }).then(getImagesOfUsers)
    }

    useEffect(() => {
        setIsLoading(true);
        fetch(apiUrl+"/connections/users?userEmail="+connectedUser.email,{
            headers : {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization':connectedUser.token
            }
        }).then((response) => {
            return  response.json();
        }).then(getImagesOfUsers);
    },[]);

    return (

        <Container>
            <Row>
                <Form className="mb-3" onSubmit={searchSubmit}>
                    <InputGroup>
                        <FormControl
                            placeholder="Enter a full name"
                            aria-label="Enter a full name"
                            aria-describedby="basic-addon1"
                            ref={searchDataRef}
                        />
                        <Button variant="outline-secondary" id="button-addon2" type={'submit`'}>Search</Button>
                    </InputGroup>
                </Form>
            </Row>
            <Row>
            <Container>
                {isLoading ? false : <UserList users={usersPreview}/>}
            </Container>
            </Row>
        </Container>
    )
}

export default Network;