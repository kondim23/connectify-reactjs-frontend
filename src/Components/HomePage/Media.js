import {Image, ListGroupItem} from "react-bootstrap";
import ReactPlayer from "react-player/lazy";
import ReactAudioPlayer from "react-audio-player";

function Media(props){

    return(
        <ListGroupItem>
            {props.media.type.includes("image") ?
                <Image src={props.media.url} style={{maxHeight:'15rem',maxWidth:'15rem'}}/> : false
            }
            {props.media.type.includes("video") ?
                <ReactPlayer url={props.media.url} controls/> : false
            }
            {props.media.type.includes("audio") ?
                <ReactAudioPlayer src={props.media.url} controls /> : false
            }
        </ListGroupItem>
    )
}

export default Media;