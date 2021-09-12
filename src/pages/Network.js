import {Button, Container, Form, FormControl, InputGroup, Row} from "react-bootstrap";
import {useContext, useEffect, useRef, useState} from "react";
import UserList from "../Components/UserList";
import UserContext from "../store/user-context";

function Network(){

    const connectedUser = useContext(UserContext);

    const searchDataRef = useRef();
    const [isLoading, setIsLoading] = useState(true);
    const [usersPreview, setUsersPreview] = useState([]);

    function searchSubmit(event){

        event.preventDefault();

        fetch("http://localhost:8080/search/"+searchDataRef.current.value,{
            headers:{
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }).then((response) => {

            return response.json();
        }).then((users) => {
            setUsersPreview(users);
        })
    }

    useEffect(() => {
        setIsLoading(true);
        fetch("http://localhost:8080/connections/users?userEmail="+connectedUser.email,{
            headers : {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }).then((response) => {
            return  response.json();
        }).then((data) => {
            setIsLoading(false);
            setUsersPreview(data);
        });
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