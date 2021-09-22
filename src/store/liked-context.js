import {createContext, useContext, useState} from "react";
import UserContext from "./user-context";
import {apiUrl} from "../baseUrl";

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

        fetch(apiUrl+'/likes',{
            headers : {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization':connectedUser.token
            },
            method:'POST',
            body: JSON.stringify({
                date : new Date().toISOString(),
                userLikes : connectedUser,
                postLiked : postData.post
            })
        });
        setUserLikedPosts(() => {
            return userLikedPosts.concat(postData.post);
        });
    }

    function unlikePostHandler(postData){

        fetch(apiUrl+'/likes?userEmail='+connectedUser.email+'&postId='+postData.post.id,{
            headers : {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization':connectedUser.token
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