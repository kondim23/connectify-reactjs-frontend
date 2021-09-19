import {createContext, useState} from "react";

const UserContext = createContext({

    isLoggedIn:false,
    isAdmin:false,
    id:null,
    email:null,
    password:null,
    name:null,
    surname:null,
    phone:null,
    image:null,
    education:null,
    skills:null,
    experience:null,
    privacyExp: true,
    privacyEdu: true,
    privacySk: true,
    setUserInfo:(userData) => {},
    setUserImage:(imageUrl) => {}
})

export function UserContextProvider(props){

    function setUserImageHandler(imageUrl){

        setUserInfo({
            isLoggedIn:userInfo.isLoggedIn,
            isAdmin:userInfo.isAdmin,
            id:userInfo.id,
            email:userInfo.email,
            password:userInfo.password,
            name:userInfo.name,
            surname:userInfo.surname,
            phone:userInfo.phone,
            image:imageUrl,
            education:userInfo.education,
            skills:userInfo.skills,
            experience:userInfo.experience,
            privacyExp: userInfo.privacyExp,
            privacyEdu: userInfo.privacyEdu,
            privacySk: userInfo.privacySk,
            setUserInfo:setUserInfo
        })
    }

    const [userInfo,setUserInfo] = useState({
        isLoggedIn:false,
        isAdmin:false,
        id:null,
        email:null,
        password:null,
        name:null,
        surname:null,
        phone:null,
        image:null,
        education:null,
        skills:null,
        experience:null,
        privacyExp: true,
        privacyEdu: true,
        privacySk: true
    });

    const context={
        isLoggedIn:userInfo.isLoggedIn,
        isAdmin:userInfo.isAdmin,
        id:userInfo.id,
        email:userInfo.email,
        password:userInfo.password,
        name:userInfo.name,
        surname:userInfo.surname,
        phone:userInfo.phone,
        image:userInfo.image,
        education:userInfo.education,
        skills:userInfo.skills,
        experience:userInfo.experience,
        privacyExp: userInfo.privacyExp,
        privacyEdu: userInfo.privacyEdu,
        privacySk: userInfo.privacySk,
        setUserInfo:setUserInfo,
        setUserImage:setUserImageHandler
    }

    return  <UserContext.Provider value={context}>
                {props.children}
            </UserContext.Provider>
}

export default UserContext;