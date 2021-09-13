import {ListGroup, ListGroupItem} from "react-bootstrap";

function User(props){

    return (
        <div className={'col'}>
            <div className={'card shadow-sm'}>
                <svg className="bd-placeholder-img card-img-top" width="100%" height="225"
                     xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: Thumbnail"
                     preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title>
                    <rect width="100%" height="100%" fill="#55595c"/>
                    <text x="50%" y="50%" fill="#eceeef" dy=".3em">Thumbnail</text>
                </svg>
                <div className="card-body">
                    <ListGroup>
                        <ListGroupItem>{props.userData.name+" "+props.userData.surname}</ListGroupItem>
                        <ListGroupItem>{props.userData.email}</ListGroupItem>
                        {props.userData.privacy_edu ? false : <ListGroupItem>{props.userData.education}</ListGroupItem>}
                        {props.userData.privacy_sk ? false : <ListGroupItem>{props.userData.skills}</ListGroupItem>}
                        {props.userData.privacy_exp ? false : <ListGroupItem>{props.userData.experience}</ListGroupItem>}
                    </ListGroup>
                </div>
            </div>
        </div>
    )
}

export default User;