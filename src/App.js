import logo from './logo.svg';
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

function App() {
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
