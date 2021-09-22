import {Button, FormControl, InputGroup} from "react-bootstrap";
import {useContext, useRef} from "react";
import UserContext from "../../store/user-context";
import {apiUrl} from "../../baseUrl";

function NewMessage(props){

    const connectedUser = useContext(UserContext);
    const postRef = useRef();

    function newMessageHandler(){

        fetch( apiUrl+"/messages",{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json',
                'Authorization':connectedUser.token
            },
            body:JSON.stringify({
                message : postRef.current.value,
                date : new Date().toISOString(),
                messageSender : connectedUser,
                messageAcceptor : props.chatter
            })
        }).then(response => {
            if (response.ok) {
                console.log(postRef.current);
                // refreshHandler();
                props.handler(props.chatter);
                console.log(postRef.current);
                // postRef.current.value = null;
            }
        });
    }

    return (
        <InputGroup className={"mb-3"}>
            <FormControl
                placeholder="Write your message here..."
                aria-label="Write your message here..."
                aria-describedby="basic-addon2"
                ref={postRef}
            />
            <Button variant="outline-secondary" id="button-addon2" onClick={newMessageHandler}>
                Send
            </Button>
        </InputGroup>
    );
}

export default NewMessage;