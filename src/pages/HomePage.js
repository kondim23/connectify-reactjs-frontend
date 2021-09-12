import {Col, Container, Row} from "react-bootstrap";
import HomePageLeftSideBar from "../Components/HomePageLeftSideBar";
import PostList from "../Components/PostList";
import {useContext, useEffect, useState} from "react";
import LikeContext from "../store/liked-context";
import UserContext from "../store/user-context";
import NewPost from "../Components/NewPost";

function HomePage(){

    const connectedUser = useContext(UserContext);
    const likeContext = useContext(LikeContext);

    const [isLoading, setIsLoading] = useState(true);
    const [loadedPosts, setLoadedPosts] = useState([]);

    useEffect(() => {
        setIsLoading(true);
        fetch("http://localhost:8080/posts?userEmail="+connectedUser.email,{
            headers : {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }).then((response) => {
            return  response.json();
        }).then((data) => {
            setIsLoading(false);
            setLoadedPosts(data);
            likeContext.initializeLikedPosts(data.map(post => post.userLikesThisPost ? post.post : false));
        });
    },[]);

    return (
        <Container >
            <Row >
                <Col xs={4}>
                    <HomePageLeftSideBar/>
                </Col>
                <Col xs={8}>
                    <Container>
                        <NewPost/>
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