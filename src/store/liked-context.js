import {createContext, useContext, useState} from "react";
import UserContext from "./user-context";

const LikeContext = createContext({
        likedPosts:[],
        likePost: (postData) => {},
        unlikePost: (postData) => {},
        isLiked: (postData) => {},
        isLoading: false
    }
);

export function LikeContextProvider(props){

    const connectedUser = useContext(UserContext);

    const [userLikedPosts, setUserLikedPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    // for (const post in props){
    //     if (post.userLikesThisPost){
    //         setUserLikedPosts(() => {
    //             return userLikedPosts.concat(post.post);
    //         });
    //     }
    // }


    function likePostHandler(postData){

        setIsLoading(true);
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
        }).then(() => setIsLoading(false));
        setUserLikedPosts(() => {
            return userLikedPosts.concat(postData.post);
        });
    }

    function unlikePostHandler(postData){

        setIsLoading(true);
        fetch('http://localhost:8080/likes?userEmail='+connectedUser.email+'&postId='+postData.post.id,{
            headers : {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            method:'DELETE'
        }).then(() => setIsLoading(false));
        setUserLikedPosts(prevLikedPosts => {
            return prevLikedPosts.filter(post => post.id !== postData.post.id);
        });
    }

    function isLikedHandler(postData){

        // return userLikedPosts.some(post => post.id === postData.post.id);
        return postData.userLikesThisPost;
    }

    const context = {
        likedPosts: userLikedPosts,
        likePost: likePostHandler,
        unlikePost: unlikePostHandler,
        isLiked: isLikedHandler,
        isLoading: isLoading
    };

    return <LikeContext.Provider value={context}>
        {props.children}
            </LikeContext.Provider>
}

export default LikeContext;