import {Accordion, Container} from "react-bootstrap";
import {useContext, useEffect, useState} from "react";
import UserContext from "../store/user-context";
import JobRequestList from "../Components/JobRequestList";
import JobList from "../Components/JobList";
import NewJob from "../Components/NewJob";

function Jobs(){

    const connectedUser = useContext(UserContext);
    const [isLoadingRequests, setIsLoadingRequests] = useState(true);
    const [loadedRequests, setLoadedRequests] = useState([]);
    const [isLoadingJobs, setIsLoadingJobs] = useState(true);
    const [loadedJobs, setLoadedJobs] = useState([]);

    function getRequestsHandler(){

        setIsLoadingRequests(true);
        fetch("http://localhost:8080/jobs/requests?userEmail="+connectedUser.email,{
            headers : {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }).then((response) => {
            return  response.json();
        }).then((data) => {
            setIsLoadingRequests(false);
            setLoadedRequests(data);
        });
    }

    useEffect(() => {
        setIsLoadingJobs(true);
        fetch("http://localhost:8080/jobs?userEmail="+connectedUser.email,{
            headers : {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }).then((response) => {
            return  response.json();
        }).then((data) => {
            setIsLoadingJobs(false);
            setLoadedJobs(data);
        });
    },[]);


    return (

        <Container>
            <div style={{marginBottom: '25px'}}>
                <Accordion defaultActiveKey="0">
                    <Accordion.Item>
                        <Accordion.Header onClick={getRequestsHandler}>View Requests sent to you</Accordion.Header>
                        <Accordion.Body>
                            {isLoadingRequests ? false : <JobRequestList requests={loadedRequests}/>}
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
            </div>
            <NewJob/>
            {isLoadingJobs ? false : <JobList jobs={loadedJobs}/>}
        </Container>
    )
}

export default Jobs;