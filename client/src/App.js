import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import './cssreset.css';
import './App.css';

import HomeMain from './Component/Home/HomeMain';
import RegisterMain from './Component/Home/Register/RegisterMain';
import LoginMain from './Component/Home/Login/LoginMain';

const App = () => {

    return (
        <div className="App">
            <Router>
                <Switch>
                    <Route path='/register' exact component={RegisterMain} />
                    <Route path='/login' exact component={LoginMain} />
                    <Route path='/' component={HomeMain} />
                </Switch>
            </Router>
        </div>
    );
}

export default App;