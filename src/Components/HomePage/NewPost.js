import {Button, Card, Container, Form, FormControl, InputGroup, ListGroup} from "react-bootstrap";
import {useContext, useRef, useState} from "react";
import UserContext from "../../store/user-context";
import {apiUrl} from "../../baseUrl";
import ListMedia from "./ListMedia";

function NewPost(props){

    const connectedUser = useContext(UserContext);
    const postRef = useRef();
    const formRef = useRef();

    const [isLoading, setIsLoading] = useState(false);
    const [loadedMedia, setLoadedMedia] = useState([]);

    function addNewMedia(event){

        setLoadedMedia(loadedMedia.concat({
            type: event.target.files[0].type,
            url: URL.createObjectURL(event.target.files[0])
        }))
    }

    function newPostHandler(){

        fetch(apiUrl+"/posts",{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json',
                'Authorization':connectedUser.token
            },
            body:JSON.stringify({
                description : postRef.current.value,
                date : new Date().toISOString(),
                postCreator : connectedUser
            })
        }).then(response => {
            return response.json();
        }).then(post => {

            const requests = loadedMedia.map(async (mediaFile) => {

                const formData = new FormData();

                const localFile = await fetch(mediaFile.url);
                const fileBlob = await localFile.blob();

                formData.append('media', fileBlob)

                return fetch(apiUrl + "/media/upload?type=" + mediaFile.type + "&postId=" + post.id, {
                    headers: {
                        'Authorization':connectedUser.token
                    },
                    method:'POST',
                    body:formData
                });
            })
            Promise.allSettled(requests).then(()=>{

                props.newPostHandler()
                postRef.current.value=null;
                formRef.current.value=null;
                setLoadedMedia([])
            })
        });
    }

    return (
        <Card style={{marginBottom:'2rem'}}>
            <Card.Body>
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
                <section>
                    {isLoading ? false : <ListMedia mediaList={loadedMedia}/>}
                </section>
                <input type={"file"} onChange={addNewMedia} ref={formRef}/>
            </Card.Body>
        </Card>
    )
}

export default NewPost;