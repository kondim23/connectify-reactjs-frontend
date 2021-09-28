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

    function getMediaOfPost(post) {
        return (mediaList) => {
            // mediaList.url=URL.createObjectURL(mediaList.media.blob())
            // console.log(mediaList)
            const mediaItemRequests = mediaList.map((mediaItem) => {

                return fetch(apiUrl + "/media/download?mediaId=" + mediaItem.id, {
                    headers: {
                        'Authorization': connectedUser.token
                    }
                }).then((response) => {
                    return response.blob()
                }).then((mediaReturned) => {
                    mediaItem.url = URL.createObjectURL(mediaReturned)
                })
            })

            Promise.allSettled(mediaItemRequests).then(() => {
                post.post.media = mediaList
            })

            return mediaItemRequests;
        };
    }

    function getAllPostMedia() {
        return (data) => {

            const requests = data.map((post) => {

                return fetch(apiUrl + "/media/type?postId=" + post.post.id, {
                    headers: {
                        'Authorization': connectedUser.token
                    }
                }).then((response) => {
                    return response.json()
                }).then(getMediaOfPost(post));
            })

            Promise.allSettled(requests).then(() => {
                console.log(data)
                setLoadedPosts(data);
                setIsLoading(false);
                likeContext.initializeLikedPosts(data.map(post => post.userLikesThisPost ? post.post : false));
            })
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
        }).then(getAllPostMedia());
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