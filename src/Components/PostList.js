import Post from "./Post";

function PostList(props){

    return (
        <ul>
            {props.posts.map(post => <Post key={post.id} description={post.description}/>)}
        </ul>
    )
}

export default PostList;