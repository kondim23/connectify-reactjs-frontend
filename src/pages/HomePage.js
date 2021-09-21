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
        }).then((data) => {
            setIsLoading(false);
            setLoadedPosts(data);
            likeContext.initializeLikedPosts(data.map(post => post.userLikesThisPost ? post.post : false));
        });
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