import {Col, Container, Row} from "react-bootstrap";
import HomePageLeftSideBar from "../Components/HomePage/HomePageLeftSideBar";
import PostList from "../Components/HomePage/PostList";
import {useContext, useEffect, useState} from "react";
import LikeContext from "../store/liked-context";
import UserContext from "../store/user-context";
import NewPost from "../Components/HomePage/NewPost";
import {apiUrl} from "../baseUrl";

function HomePage(){

    const connectedUser = useContext(UserContext);
    const likeContext = useContext(LikeContext);

    const [isLoading, setIsLoading] = useState(true);
    const [loadedPosts, setLoadedPosts] = useState([]);

    function getMediaFileBlob() {
        return (mediaItem) => {

            return fetch(apiUrl + "/media/download?mediaId=" + mediaItem.id, {
                headers: {
                    'Authorization': connectedUser.token
                }
            }).then((response) => {
                return response.blob()
            }).then((mediaReturned) => {
                mediaItem.url = URL.createObjectURL(mediaReturned)
            })
        };
    }

    function getMediaOfPost(data) {
        return () => {

            const mediaItemRequests = data.map((post) => {
                return post.post.media.map(getMediaFileBlob())
            })

            let allMediaItemRequests = [];
            for (const item of mediaItemRequests)
                allMediaItemRequests = allMediaItemRequests.concat(item)

            Promise.allSettled(allMediaItemRequests).then(() => {
                setLoadedPosts(data);
                setIsLoading(false);
                likeContext.initializeLikedPosts(data.map(post => post.userLikesThisPost ? post.post : false));
            })
        };
    }

    function getAllMedia() {
        return (data) => {

            const requests = data.map((post) => {

                return fetch(apiUrl + "/media/type?postId=" + post.post.id, {
                    headers: {
                        'Authorization': connectedUser.token
                    }
                }).then((response) => {
                    return response.json()
                }).then((mediaList)=>{
                    post.post.media=mediaList
                });
            })

            Promise.allSettled(requests).then(getMediaOfPost(data))
        };
    }

    function loadPosts() {
        setIsLoading(true);
        fetch(apiUrl+"/posts?userEmail="+connectedUser.email,{
            headers : {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization':connectedUser.token
            }
        }).then((response) => {
            return  response.json();
        }).then(getAllMedia());
    }

    useEffect(loadPosts,[]);

    return (
        <Container >
            <Row >
                <Col lg={3}>
                    <HomePageLeftSideBar/>
                </Col>
                <Col lg={9}>
                    <Container>
                        <NewPost newPostHandler={loadPosts}/>
                        <section>
                                {isLoading ? false : <PostList posts={loadedPosts}/>}
                        </section>
                    </Container>
                </Col>
            </Row>
        </Container>
    )
}

export default HomePage;