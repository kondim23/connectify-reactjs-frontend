import {createContext, useState} from "react";

const UserToVisitContext = createContext({

    email:null,
    name:null,
    surname:null,
    phone:null,
    image:null,
    education:null,
    skill:null,
    experience:null,
    privacyExp: true,
    privacyEdu: true,
    privacySk: true,
    setUserToVisitInfo:(userToVisitData) => {}
})

export function UserToVisitContextProvider(props){

    function setUserToVisit(userToVisitData){
        return fetch("http://localhost:8080/user/image?userEmail="+userToVisitData.email,{
            headers:{}
        }).then(response => {
            return response.blob()
        }).then((image) => {
            userToVisitData.image=URL.createObjectURL(image)
            setUserToVisitInfo(userToVisitData)
        })
    }

    const [userToVisitInfo,setUserToVisitInfo] = useState({
        email:null,
        name:null,
        surname:null,
        phone:null,
        image:null,
        education:null,
        skill:null,
        experience:null,
        privacyExp: true,
        privacyEdu: true,
        privacySk: true
    });

    const context={
        email:userToVisitInfo.email,
        name:userToVisitInfo.name,
        surname:userToVisitInfo.surname,
        phone:userToVisitInfo.phone,
        image:userToVisitInfo.image,
        education:userToVisitInfo.education,
        skill:userToVisitInfo.skill,
        experience:userToVisitInfo.experience,
        privacyExp: userToVisitInfo.privacyExp,
        privacyEdu: userToVisitInfo.privacyEdu,
        privacySk: userToVisitInfo.privacySk,
        setUserToVisitInfo:setUserToVisit
    }

    return  <UserToVisitContext.Provider value={context}>
        {props.children}
    </UserToVisitContext.Provider>
}

export default UserToVisitContext;