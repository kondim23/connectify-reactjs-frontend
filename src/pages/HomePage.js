import {Col, Container, Row} from "react-bootstrap";
import HomePageLeftSideBar from "../Components/HomePageLeftSideBar";
import PostList from "../Components/PostList";
import {useContext, useEffect, useState} from "react";
import {LikeContextProvider} from "../store/liked-context";
import UserContext from "../store/user-context";

function HomePage(){

    const connectedUser = useContext(UserContext);

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
        });
    },[]);

    return (<Container>
                <Row>
                    <Col xs={4}>
                        <HomePageLeftSideBar/>
                    </Col>
                    <Col xs={8}>
                        <section>
                            <ul>
                                {isLoading ? <h1>Loading...</h1> :
                                    <LikeContextProvider>
                                        <PostList posts={loadedPosts}/>
                                    </LikeContextProvider>
                                }
                            </ul>
                        </section>
                    </Col>
                </Row>
            </Container>)
}

export default HomePage;