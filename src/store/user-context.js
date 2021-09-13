import {createContext, useState} from "react";

const UserContext = createContext({

    isLoggedIn:false,
    isAdmin:false,
    email:null,
    password:null,
    name:null,
    surname:null,
    phone:null,
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
        phone:null
    });

    const context={
        isLoggedIn:userInfo.isLoggedIn,
        isAdmin:userInfo.isAdmin,
        email:userInfo.email,
        password:userInfo.password,
        name:userInfo.name,
        surname:userInfo.surname,
        phone:userInfo.phone,
        setUserInfo:setUserInfo
    }

    return  <UserContext.Provider value={context}>
                {props.children}
            </UserContext.Provider>
}

export default UserContext;