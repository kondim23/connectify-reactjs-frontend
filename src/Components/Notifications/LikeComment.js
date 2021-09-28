import {Card, ListGroupItem} from "react-bootstrap";
import {useContext} from "react";
import {Link, useHistory} from "react-router-dom";
import UserContext from "../../store/user-context";
import {apiUrl} from "../../baseUrl";

function LikeComment(props){

    const connectedUser = useContext(UserContext);
    const history = useHistory()

    function visitUser(){

        const user = props.notification.comment ? props.notification.userComments :
            props.notification.userLikes

        fetch(apiUrl+"/user/image?userEmail="+user.email,{
            headers:{
                'Authorization':connectedUser.token
            }
        }).then(response => {
            return response.blob()
        }).then((image) => {

            user.image = image.size ? URL.createObjectURL(image) :
                "https://www.kindpng.com/picc/m/24-248253_user-profile-default-image-png-clipart-png-download.png"
            history.push({
                pathname: '/user/'+user.email,
                state: { userToVisit: user }
            })
        })
    }

    if (props.notification.comment) {
        if (connectedUser.email!==props.notification.userComments.email) return (
            <ListGroupItem onClick={visitUser} id={props.notification}>
                    <Card>
                        <Card.Body>
                            {props.notification.userComments.name + " " + props.notification.userComments.surname} commented
                            "{props.notification.comment}" on your post "{props.notification.postCommented.description}".
                        </Card.Body>
                    </Card>
            </ListGroupItem>
        )
        else return (
            <ListGroupItem as={Link} to={'/profile'}>
                <Card>
                    <Card.Body>
                        {props.notification.userComments.name + " " + props.notification.userComments.surname} commented
                        "{props.notification.comment}" on your post "{props.notification.postCommented.description}".
                    </Card.Body>
                </Card>
            </ListGroupItem>
        )
    }
    else {
        if (connectedUser.email!==props.notification.userLikes.email) return (
            <ListGroupItem onClick={visitUser}>
                <Card>
                    <Card.Body>
                        {props.notification.userLikes.name + " " + props.notification.userLikes.surname} liked
                        your post "{props.notification.postLiked.description}".
                    </Card.Body>
                </Card>
            </ListGroupItem>
        )
        else return (
            <ListGroupItem as={Link} to={'/profile'}>
                <Card>
                    <Card.Body>
                        {props.notification.userLikes.name + " " + props.notification.userLikes.surname} liked
                        your post "{props.notification.postLiked.description}".
                    </Card.Body>
                </Card>
            </ListGroupItem>
        )
    }
}

export default LikeComment;