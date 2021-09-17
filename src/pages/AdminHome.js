import {Button, Card, Col, Container, FormText, Row} from "react-bootstrap";
import {useEffect, useState} from "react";
import AdminUserList from "../Components/AdminUserList";
import exportFromJSON from "export-from-json";

function AdminHome() {

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

        fetch("http://localhost:8080/admin/users",{
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            method:'POST',
            body:JSON.stringify(usersExport)
        }).then((response)=>{
            return response.json()
        }).then((data)=>{
            const blob = new Blob([JSON.stringify(data)],{type:'application/json'})
            const link = document.createElement('a')
            link.href = URL.createObjectURL(blob)
            link.download = 'export.json'
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        })
    }

    function exportXML(){
        fetch("http://localhost:8080/admin/users",{
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
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
        fetch("http://localhost:8080/users",{
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
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