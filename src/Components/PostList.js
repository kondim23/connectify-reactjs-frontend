import Post from "./Post";
import {ListGroup} from "react-bootstrap";


function PostList(props){

    return (
        <ListGroup variant={"flush"}>
            {props.posts.map(post => <Post
                post={post.post}
                userLikesThisPost={post.userLikesThisPost}
            />)}
        </ListGroup>
    )
}

export default PostList;