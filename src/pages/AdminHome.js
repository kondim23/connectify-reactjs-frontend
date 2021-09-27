import {Button, Card, Col, Container, FormText, Row} from "react-bootstrap";
import {useContext, useEffect, useState} from "react";
import AdminUserList from "../Components/AdminHome/AdminUserList";
import exportFromJSON from "export-from-json";
import UserContext from "../store/user-context";
import {apiUrl} from "../baseUrl";

function AdminHome() {

    const connectedUser = useContext(UserContext)

    const [isLoading, setIsLoading] = useState(true);
    const [userList, setUserList] = useState([]);
    const [usersExport, setUsersExport] = useState([]);

    function userSelectorHandler(user){
        setUsersExport(()=>{
            if (user in usersExport)
                return usersExport.filter(exportedUser => exportedUser.email !== user.email);
            else return usersExport.concat(user);
        })
    }

    function exportJSON(){

        fetch(apiUrl+"/admin/users",{
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json',
                'Authorization':connectedUser.token
            },
            method:'POST',
            body:JSON.stringify(usersExport)
        }).then((response)=>{
            return response.json()
        }).then((data)=>{
            exportFromJSON({
                data:data,
                fileName:'export.json',
                exportType:exportFromJSON.types.json
            })
        })
    }

    function exportXML(){
        fetch(apiUrl+"/admin/users",{
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json',
                'Authorization':connectedUser.token
            },
            method:'POST',
            body:JSON.stringify(usersExport)
        }).then((response)=>{
            return response.json()
        }).then((data)=>{
            exportFromJSON({
                data:data,
                fileName:'export.xml',
                exportType:exportFromJSON.types.xml
            })
        })
    }

    useEffect(()  => {
        setIsLoading(true)
        fetch(apiUrl+"/users",{
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json',
                'Authorization':connectedUser.token
            }
        }).then((response)=>{
            return response.json()
        }).then((users) => {
            setUserList(users);
            setIsLoading(false);
        })
    },[])

    return (
        <Container>
            <FormText>Administrator Page</FormText>
            <Card>
                <Card.Header>List of users:</Card.Header>
                <Card.Body>
                {isLoading ? false : <AdminUserList users={userList} userSelectorHandler={userSelectorHandler}/>}
                <Row style={{marginTop:'1rem'}}>
                    <Col lg={2}>
                        <Button variant="outline-secondary"
                                id="button-addon2"
                                style={{width:'10rem'}}
                                onClick={exportJSON}>
                            Export as JSON
                        </Button>
                    </Col>
                    <Col lg={9}>
                        <Button variant="outline-secondary"
                                id="button-addon2"
                                style={{width:'10rem'}}
                                onClick={exportXML}>
                            Export as XML
                        </Button>
                    </Col>
                </Row>
                </Card.Body>
            </Card>
        </Container>
    )
}

export default AdminHome;