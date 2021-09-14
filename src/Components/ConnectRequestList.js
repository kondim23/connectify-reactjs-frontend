import {ListGroup} from "react-bootstrap";
import ConnectRequest from "./ConnectRequest";

function ConnectRequestList(props){

    return(
        <ListGroup variant={"flush"}>
            {props.connectRequests.map(connectionRequest => <ConnectRequest connectionRequest={connectionRequest}
                                                                            requestAnsweredHandler={props.requestAnsweredHandler}/>)}
        </ListGroup>
    )
}

export default ConnectRequestList;