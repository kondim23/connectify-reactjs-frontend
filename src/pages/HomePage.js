import {Col, Container, Row} from "react-bootstrap";
import HomePageLeftSideBar from "../Components/HomePageLeftSideBar";
import PostList from "../Components/PostList";
import {useEffect, useState} from "react";

function HomePage(){

    const [isLoading, setIsLoading] = useState(true);
    const [loadedPosts, setLoadedPosts] = useState([]);

    useEffect(() => {
        setIsLoading(true);
        console.log(1);
        fetch("http://localhost:8080/allPosts",{
            headers : {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Access-Control-Allow-Origin' : 'http://localhost:3000'
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
                                {isLoading ? <h1>dead</h1> : <PostList posts={loadedPosts}/> }
                            </ul>
                        </section>
                    </Col>
                </Row>
            </Container>)
}

export default HomePage;