import {Card, Col, ListGroup, ListGroupItem} from "react-bootstrap";
import {useHistory} from "react-router-dom";

function User(props){

    const history = useHistory()

    function visitUser(){

        history.push({
            pathname: '/user/'+props.userData.email,
            state: { userToVisit: props.userData }
        })
    }

    return (
        <Col>
            <Card>
                <Card.Img src={props.userData.image}/>
                <Card.Body className="card-body">
                    <ListGroup>
                        <ListGroupItem onClick={visitUser}>{props.userData.name+" "+props.userData.surname}</ListGroupItem>
                        <ListGroupItem>{props.userData.email}</ListGroupItem>
                        {props.userData.privacyEdu ? false : <ListGroupItem>{props.userData.education}</ListGroupItem>}
                        {props.userData.privacySk ? false : <ListGroupItem>{props.userData.skills}</ListGroupItem>}
                        {props.userData.privacyExp ? false : <ListGroupItem>{props.userData.experience}</ListGroupItem>}
                    </ListGroup>
                </Card.Body>
            </Card>
        </Col>
    )
}

export default User;