import ListGroupItem from 'react-bootstrap/ListGroupItem';
import  Button from 'react-bootstrap/Button';
import {useState} from "react";

function Chatter(props) {

    const  [isActive , setIsActive] = useState(false);


    function loadChatHandler(){

        setIsActive(true);
        props.handler(props.chatter);
    }

    if (isActive) {
        setIsActive(false)
        return (
            <ListGroupItem as={Button} style={{height: '5rem',color:'cyan'}} variant="outline-secondary" onClick={loadChatHandler}>
                {props.chatter.name + ' ' + props.chatter.surname}
            </ListGroupItem>
        )
    }
    else return (
        <ListGroupItem as={Button} style={{height:'5rem'}} variant="outline-secondary" onClick={loadChatHandler} >
            {props.chatter.name + ' ' + props.chatter.surname }
        </ListGroupItem>
    )

}

export default Chatter;