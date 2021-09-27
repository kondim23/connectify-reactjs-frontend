import {ListGroupItem} from "react-bootstrap";
import {useHistory} from "react-router-dom";
import {apiUrl} from "../../baseUrl";
import {useContext} from "react";
import UserContext from "../../store/user-context";

function JobRequest(props){

    const connectedUser = useContext(UserContext)

    const history = useHistory()

    function visitUser(){

        const user = props.request.applicantUser

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

    return (
        <ListGroupItem onClick={visitUser}>
            <p>{props.request.applicantUser.name + " " + props.request.applicantUser.surname} has sent a request
            for job "{props.request.jobToApply.description}". </p>
        </ListGroupItem>
    )
}

export default JobRequest;