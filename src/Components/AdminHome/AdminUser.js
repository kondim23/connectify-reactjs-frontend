import {InputGroup, ListGroupItem} from "react-bootstrap";
import {useContext} from "react";
import {useHistory} from "react-router-dom";
import {apiUrl} from "../../baseUrl";
import UserContext from "../../store/user-context";

function AdminUser(props){

    const connectedUser = useContext(UserContext)
    const history = useHistory()

    function userSelected(){props.userSelectorHadler(props.user)}

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
                pathname: '/admin/user/'+user.email,
                state: { userToVisit: user }
            })
        })
    }

    return (
        <ListGroupItem>
            <InputGroup className="mb-3">
                <InputGroup.Checkbox onClick={userSelected}/>
                <ListGroupItem onClick={visitUser}>
                    {props.user.name+" "+props.user.surname+" "+props.user.email}
                </ListGroupItem>
            </InputGroup>
        </ListGroupItem>
    )
}

export default AdminUser;