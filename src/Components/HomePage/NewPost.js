import {Button, FormControl, InputGroup} from "react-bootstrap";
import {useContext, useRef} from "react";
import UserContext from "../../store/user-context";

function NewPost(props){

    const connectedUser = useContext(UserContext);
    const postRef = useRef();

    function newPostHandler(){

        fetch("http://localhost:8080/posts",{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                description : postRef.current.value,
                date : new Date().getUTCDate(),
                postCreator : connectedUser
            })
        }).then(response => {
            if (response.ok) {
                props.newPostHandler()
                postRef.current.value=null;
            }
        });
    }

    return (
        <InputGroup className={"mb-3"}>
            <FormControl
                placeholder="What are you thinking?"
                aria-label="What are you thinking?"
                aria-describedby="basic-addon2"
                ref={postRef}
            />
            <Button variant="outline-secondary" id="button-addon2" onClick={newPostHandler}>
                Post
            </Button>
        </InputGroup>
    )
}

export default NewPost;