import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import './cssreset.css';
import './App.css';
import 'semantic-ui-css/semantic.min.css'

import HomeMain from './Component/Home/HomeMain';
import RegisterMain from './Component/Home/Register/RegisterMain';
import LoginMain from './Component/Home/Login/LoginMain';
import DashboardMain from './Component/Dashboard/DashboardMain';

const App = () => {

    return (
        <div>
            <div className="App">
                <Router>
                    <Switch>
                        <Route path='/register' exact component={RegisterMain} />
                        <Route path='/login' exact component={LoginMain} />
                        <Route path='/dashboard' exact component={DashboardMain} />
                        <Route path='/' component={HomeMain} />
                    </Switch>
                </Router>
            </div>
            <p className="AppDesktopWarning">Please visit this application on your phone.</p>
        </div>
    );
}

export default App;