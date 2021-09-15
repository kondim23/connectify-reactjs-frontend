import {createContext, useState} from "react";

const UserContext = createContext({

    isLoggedIn:false,
    isAdmin:false,
    email:null,
    password:null,
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
    setUserInfo:(userData) => {}
})

export function UserContextProvider(props){

    const [userInfo,setUserInfo] = useState({
        isLoggedIn:false,
        isAdmin:false,
        email:null,
        password:null,
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
        isLoggedIn:userInfo.isLoggedIn,
        isAdmin:userInfo.isAdmin,
        email:userInfo.email,
        password:userInfo.password,
        name:userInfo.name,
        surname:userInfo.surname,
        phone:userInfo.phone,
        image:userInfo.image,
        education:userInfo.education,
        skill:userInfo.skill,
        experience:userInfo.experience,
        privacyExp: userInfo.privacyExp,
        privacyEdu: userInfo.privacyEdu,
        privacySk: userInfo.privacySk,
        setUserInfo:setUserInfo
    }

    return  <UserContext.Provider value={context}>
                {props.children}
            </UserContext.Provider>
}

export default UserContext;