import {Button, Card, Form} from "react-bootstrap";
import {useContext, useRef} from "react";
import UserContext from "../store/user-context";

function NewJob() {

    const connectedUser = useContext(UserContext);

    const titleRef = useRef();
    const descriptionRef = useRef();

    function newJobHandler(event){

        event.preventDefault();

        fetch("http://localhost:8080/jobs",{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                title : titleRef.current.value,
                description : descriptionRef.current.value,
                creatorJob : connectedUser
            })
        })
    }

    return (
        <Card>
            <Card.Body>
                <Card.Title>Submit a new job!</Card.Title>
                <Form onSubmit={newJobHandler}>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Title</Form.Label>
                        <Form.Control type="text" placeholder="Enter a title for the provided job." ref={titleRef}/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                        <Form.Label>Description</Form.Label>
                        <Form.Control as="textarea" rows={5} placeholder={"Enter a description for the provided job"} ref={descriptionRef}/>
                    </Form.Group>
                    <Button type={"submit"} variant="outline-secondary" id="button-addon2" >Submit Job</Button>
                </Form>
            </Card.Body>
        </Card>
    )
}

export default NewJob;