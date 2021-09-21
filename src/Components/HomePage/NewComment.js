import {Button, FormControl, InputGroup} from "react-bootstrap";
import {useContext, useRef} from "react";
import UserContext from "../../store/user-context";
import {apiUrl} from "../../baseUrl";

function NewComment(props){

    const connectedUser = useContext(UserContext);
    const commentRef = useRef();

    function newCommentHandler(){

        fetch(apiUrl+"/comments",{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json',
                'Authorization':connectedUser.token
            },
            body:JSON.stringify({
                comment : commentRef.current.value,
                date : new Date().getUTCDate(),
                postCommented : props.post,
                userComments : connectedUser
            })
        }).then((response) => {
            if (response.ok) {
                props.newCommentHandler()
                commentRef.current.value=null;
            }
        })
    }

    return (
        <InputGroup className={"mb-3"}>
            <FormControl
                placeholder="Add a new comment"
                aria-label="Add a new comment"
                aria-describedby="basic-addon2"
                ref={commentRef}
            />
            <Button variant="outline-secondary" id="button-addon2" onClick={newCommentHandler}>
                Post
            </Button>
        </InputGroup>
    )
}

export default NewComment;