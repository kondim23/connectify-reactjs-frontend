import './App.css';

import {Route, Switch} from "react-router-dom";

import HomePage from "./pages/HomePage";
import Network from "./pages/Network";
import Jobs from "./pages/Jobs";
import Messaging from "./pages/Messaging";
import Notifications from "./pages/Notifications";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import MainNavigation from "./Components/Layout/MainNavigation";
import 'bootstrap/dist/css/bootstrap.min.css';
import {useContext, useEffect} from "react";
import SignUpLogIn from "./pages/SignUp-LogIn";
import UserContext from "./store/user-context";
import {LikeContextProvider} from "./store/liked-context";
import UserProfile from "./pages/UserProfile";
import AdminHome from "./pages/AdminHome";
import AdminUserProfile from "./pages/AdminUserProfile";
import AdminNavigationBar from "./Components/Layout/AdminNavigationBar";
import {apiUrl} from "./baseUrl";

function App(props) {

    const connectedUserInfo = useContext(UserContext);
    const token = JSON.parse(localStorage.getItem('connectedUser'))

    useEffect(()=>{

        if (token && !connectedUserInfo.isLoggedIn) {

            fetch(apiUrl+"/user/image?userEmail=" + token.email, {
                headers: {
                    'Authorization':token.token
                }
            }).then(response => {
                return response.blob()
            }).then(data => {
                token.image = data.size ? URL.createObjectURL(data) :
                    "https://www.kindpng.com/picc/m/24-248253_user-profile-default-image-png-clipart-png-download.png"
                connectedUserInfo.setUserInfo(token)
            })
        }
    },[connectedUserInfo])

    if (!connectedUserInfo.isLoggedIn) return (
        <div>
            <SignUpLogIn/>
        </div>
    )

    if (connectedUserInfo.isAdmin) return (
        <div>
            <div style={{marginBottom: '25px'}}>
                <AdminNavigationBar />
            </div>
            <Switch>
                <Route path={'/'} exact>
                    <AdminHome/>
                </Route>
                <Route path={'/admin/user/:userToVisit'} exact component={AdminUserProfile}/>
            </Switch>
        </div>
    )

    return (
      <div>
          <div style={{marginBottom: '25px'}}>
            <MainNavigation />
          </div>
          <Switch>
              <Route path='/' exact>
                  <LikeContextProvider>
                    <HomePage />
                  </LikeContextProvider>
              </Route>
              <Route path='/network' exact>
                  <Network />
              </Route>
              <Route path='/jobs' exact>
                  <Jobs />
              </Route>
              <Route path='/messaging' exact
                     render={(props) => <Messaging {...props}/>}/>
              <Route path='/notifications' exact>
                  <Notifications />
              </Route>
              <Route path='/profile' exact>
                  <Profile />
              </Route>
              <Route path='/settings' exact>
                  <Settings />
              </Route>
              <Route path='/user/:userToVisit' exact component={UserProfile}/>
          </Switch>

      </div>
    );
}

export default App;
