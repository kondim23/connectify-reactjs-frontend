import {createContext, useContext, useState} from "react";
import UserContext from "./user-context";

const LikeContext = createContext({
        likedPosts:[],
        initializeLikedPosts: (likedPosts) => {},
        likePost: (postData) => {},
        unlikePost: (postData) => {},
        isLiked: (postData) => {}
    }
);

export function LikeContextProvider(props){

    const connectedUser = useContext(UserContext);

    const [userLikedPosts, setUserLikedPosts] = useState([]);

    function initializeLikedPostsHandler(likedPosts){
        setUserLikedPosts(likedPosts);
    }

    function likePostHandler(postData){

        fetch('http://localhost:8080/likes',{
            headers : {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            method:'POST',
            body: JSON.stringify({
                date : new Date().getUTCDate(),
                userLikes : connectedUser,
                postLiked : postData.post
            })
        });
        setUserLikedPosts(() => {
            return userLikedPosts.concat(postData.post);
        });
    }

    function unlikePostHandler(postData){

        fetch('http://localhost:8080/likes?userEmail='+connectedUser.email+'&postId='+postData.post.id,{
            headers : {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            method:'DELETE'
        });
        setUserLikedPosts(prevLikedPosts => {
            return prevLikedPosts.filter(post => post.id !== postData.post.id);
        });
    }

    function isLikedHandler(postData){

        return userLikedPosts.some(post => post.id === postData.post.id);
    }

    const context = {
        likedPosts: userLikedPosts,
        initializeLikedPosts: initializeLikedPostsHandler,
        likePost: likePostHandler,
        unlikePost: unlikePostHandler,
        isLiked: isLikedHandler
    };

    return <LikeContext.Provider value={context}>
        {props.children}
            </LikeContext.Provider>
}

export default LikeContext;