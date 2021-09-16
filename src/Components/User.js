import {Card, ListGroup, ListGroupItem} from "react-bootstrap";
import {Link} from "react-router-dom";
import {useContext} from "react";
import UserToVisitContext from "../store/userToVisit-context";

function User(props){

    const userToVisit = useContext(UserToVisitContext);

    function setUserToVisit(){
        userToVisit.setUserToVisitInfo(props.userData);
    }

    console.log(props.userData.image)

    return (
        <div className={'col'}>
            <div className={'card shadow-sm'}>
                {/*<svg className="bd-placeholder-img card-img-top" width="100%" height="225"*/}
                {/*     xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: Thumbnail"*/}
                {/*     preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title>*/}
                {/*    <rect width="100%" height="100%" fill="#55595c"/>*/}
                {/*    <text x="50%" y="50%" fill="#eceeef" dy=".3em">Thumbnail</text>*/}
                {/*</svg>*/}
                <Card.Img src={props.userData.image}/>
                <div className="card-body">
                    <ListGroup>
                        <ListGroupItem as={Link} to={'/user'} onClick={setUserToVisit}>{props.userData.name+" "+props.userData.surname}</ListGroupItem>
                        <ListGroupItem>{props.userData.email}</ListGroupItem>
                        {props.userData.privacyEdu ? false : <ListGroupItem>{props.userData.education}</ListGroupItem>}
                        {props.userData.privacySk ? false : <ListGroupItem>{props.userData.skills}</ListGroupItem>}
                        {props.userData.privacyExp ? false : <ListGroupItem>{props.userData.experience}</ListGroupItem>}
                    </ListGroup>
                </div>
            </div>
        </div>
    )
}

export default User;