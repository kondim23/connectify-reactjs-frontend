import {Accordion, Container} from "react-bootstrap";
import {useContext, useEffect, useState} from "react";
import UserContext from "../store/user-context";
import JobRequestList from "../Components/Jobs/JobRequestList";
import JobList from "../Components/Jobs/JobList";
import NewJob from "../Components/Jobs/NewJob";
import {apiUrl} from "../baseUrl";

function Jobs(){

    const connectedUser = useContext(UserContext);
    const [isLoadingRequests, setIsLoadingRequests] = useState(true);
    const [loadedRequests, setLoadedRequests] = useState([]);
    const [isLoadingJobs, setIsLoadingJobs] = useState(true);
    const [loadedJobs, setLoadedJobs] = useState([]);

    function getRequestsHandler(){

        setIsLoadingRequests(true);
        fetch(apiUrl+"/jobs/requests?userEmail="+connectedUser.email,{
            headers : {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization':connectedUser.token
            }
        }).then((response) => {
            return  response.json();
        }).then((data) => {
            setIsLoadingRequests(false);
            setLoadedRequests(data);
        });
    }

    function getJobs(){
        setIsLoadingJobs(true);
        fetch(apiUrl+"/jobs?userEmail="+connectedUser.email,{
            headers : {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization':connectedUser.token
            }
        }).then((response) => {
            return  response.json();
        }).then((data) => {

            const requests = data.map((job)=>{
                return fetch(apiUrl+"/jobs/requests/single?userEmail="+connectedUser.email+"&jobId="+job.id,{
                    headers:{
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        'Authorization':connectedUser.token
                    }
                }).then((response)=>{
                    return response.ok ? response.json() : null
                }).then((jobRequest)=>{

                    if (jobRequest==null) return;
                    job.date=jobRequest.date;
                })
            })

            Promise.allSettled(requests).then(()=>{
                setIsLoadingJobs(false);
                setLoadedJobs(data);
            })
        });
    }

    useEffect(getJobs,[]);

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
            <NewJob newJobHandler={getJobs}/>
            {isLoadingJobs ? false : <JobList jobs={loadedJobs}/>}
        </Container>
    )
}

export default Jobs;