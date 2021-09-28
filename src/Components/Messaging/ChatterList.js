import Chatter from './Chatter';
import {ListGroup, Card} from "react-bootstrap";

function ChatterList(props) {

    return (
        <Card style={{height:'40rem',overflowY:'auto'}}>
            <ListGroup>
                {props.chatters.map( (chatter) => <Chatter chatter = {chatter} handler={props.handler}/>)}
            </ListGroup>
        </Card>
    );
}

export default ChatterList;
