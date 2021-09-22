import ListGroupItem from 'react-bootstrap/ListGroupItem';
import  Button from 'react-bootstrap/Button';

function Chatter(props) {

    function loadChatHandler(){
        props.handler(props.chatter);
    }

    return (
        <ListGroupItem as={Button} style={{height:'5rem'}} variant="outline-secondary" onClick={loadChatHandler}>
                {props.chatter.name + ' ' + props.chatter.surname }
        </ListGroupItem>
    );

}

export default Chatter;