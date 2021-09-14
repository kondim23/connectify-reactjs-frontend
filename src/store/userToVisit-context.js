import {createContext, useState} from "react";

const UserToVisitContext = createContext({

    email:null,
    name:null,
    surname:null,
    phone:null,
    education:null,
    skill:null,
    experience:null,
    privacyExp: true,
    privacyEdu: true,
    privacySk: true,
    setUserToVisitInfo:(userToVisitData) => {}
})

export function UserToVisitContextProvider(props){

    const [userToVisitInfo,setUserToVisitInfo] = useState({
        email:null,
        name:null,
        surname:null,
        phone:null,
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
        education:userToVisitInfo.education,
        skill:userToVisitInfo.skill,
        experience:userToVisitInfo.experience,
        privacyExp: userToVisitInfo.privacyExp,
        privacyEdu: userToVisitInfo.privacyEdu,
        privacySk: userToVisitInfo.privacySk,
        setUserToVisitInfo:setUserToVisitInfo
    }

    return  <UserToVisitContext.Provider value={context}>
        {props.children}
    </UserToVisitContext.Provider>
}

export default UserToVisitContext;