import './App.css';

import {Route, Switch} from "react-router-dom";

import HomePage from "./pages/HomePage";
import Network from "./pages/Network";
import Jobs from "./pages/Jobs";
import Messaging from "./pages/Messaging";
import Notifications from "./pages/Notifications";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import MainNavigation from "./Components/layout/MainNavigation";
import 'bootstrap/dist/css/bootstrap.min.css';
import {useContext} from "react";
import SignUpLogIn from "./pages/SignUp-LogIn";
import UserContext from "./store/user-context";

function App() {

    const connectedUserInfo = useContext(UserContext);

    if (!connectedUserInfo.isLoggedIn) return (
        <div>
            <SignUpLogIn/>
        </div>
    )


  return (
      <div>
          <MainNavigation />
          <Switch>
              <Route path='/' exact>
                <HomePage />
              </Route>
              <Route path='/network' exact>
                  <Network />
              </Route>
              <Route path='/jobs' exact>
                  <Jobs />
              </Route>
              <Route path='/messaging' exact>
                  <Messaging />
              </Route>
              <Route path='/notifications' exact>
                  <Notifications />
              </Route>
              <Route path='/profile' exact>
                  <Profile />
              </Route>
              <Route path='/settings' exact>
                  <Settings />
              </Route>
          </Switch>

      </div>
  );
}

export default App;
