import {ListGroup} from "react-bootstrap";
import Media from "./Media";

function ListMedia(props){

    return(
        <ListGroup variant={"flush"}>
            {props.mediaList.map(media => <Media media={media}/>)}
        </ListGroup>
    )
}

export default ListMedia;