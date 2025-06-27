import {ListGroupItem} from "react-bootstrap";
import {useContext} from "react";
import {Link, useHistory} from "react-router-dom";
import UserContext from "../../store/user-context";
import {apiUrl} from "../../baseUrl";

function UserConnection(props){

    const connectedUser = useContext(UserContext);
    const history = useHistory()

    function visitUser(){

        const user = props.user

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

    if (props.user.email !== connectedUser.email) return(
        <ListGroupItem onClick={visitUser}>
            {props.user.name+" "+props.user.surname}
        </ListGroupItem>
    )
    else return(
        <ListGroupItem as={Link} to={'/profile'}>
                {props.user.name + ' ' + props.user.surname}
        </ListGroupItem>
    )
}

export default UserConnection;