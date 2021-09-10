import {createContext, useState} from "react";

const LikeContext = createContext({
        likedPosts:[],
        likePost: (postData) => {},
        unlikePost: (postData) => {},
        isLiked: (postData) => {}
    }
);

export function LikeContextProvider(props){

    const [userLikedPosts, setUserLikedPosts] = useState([]);

    for (const post in props){
        if (post.userLikesThisPost){
            setUserLikedPosts(() => {
                return userLikedPosts.concat(post.post);
            });
        }
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
                userLikes : postData.post.postCreator,
                postLiked : postData.post
            })
        });
        setUserLikedPosts(() => {
            return userLikedPosts.concat(postData.post);
        });
    }

    function unlikePostHandler(postData){

        fetch('http://localhost:8080/likes?userEmail=kostas@mail.com&postId='+postData.post.id,{
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
        // return postData.userLikesThisPost;
    }

    const context = {
        likedPosts: userLikedPosts,
        likePost: likePostHandler,
        unlikePost: unlikePostHandler,
        isLiked: isLikedHandler
    };

    return <LikeContext.Provider value={context}>
        {props.children}
            </LikeContext.Provider>
}

export default LikeContext;