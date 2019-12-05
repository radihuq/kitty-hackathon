import React, {useState, useEffect, lazy, Suspense} from 'react';
import {useHistory} from 'react-router-dom';
import axios from 'axios';
import './Dashboard.css';

import UserData from '../../Context/UserData';

import MenuMain from './Menu/MenuMain';
import DashboardActivity from './DashboardActivity';

import {Loader} from 'semantic-ui-react';

const qs = require('query-string');

const DashboardMain = () => {

    const [initialized, setInitialized] = useState(false);
    const [loadingData, setLoadingData] = useState(false);
    const [userData, setUserData] = useState({});
    const [activeMenuItem, setActiveMenuItem] = useState('');

    const history = useHistory();

    let query = qs.parse(history.location.search);

    useEffect(() => {
        if (!query.v) {
            history.push(`/`);
        }
    });

    if (!initialized) {
        if (!loadingData){
            setLoadingData(true);

            const data = {
                id: query.id
            }

            axios.post(`${process.env.REACT_APP_SERVER}/api/load/user`, data)
            .then((res) => {
                setActiveMenuItem('groups');
                setUserData(res.data.response);
                axios.get(`${process.env.REACT_APP_SERVER}/api/auth/verify`)
                .then((res) => {
                    if (res.status === 200) {
                        sessionStorage.setItem('oauth', res.data.response.token);
                        setInitialized(true);
                    } else {
                        console.log(res);
                        alert('There was an issue.');
                        setInitialized(true);
                    }
                })

            })
            .catch((err) => {
                console.log(err);
                setInitialized(true);
                alert(`Error: ${err}`);
            })
        }
    }

    const handleChangeMenu = (v) => {
        history.push(`/dashboard?id=${query.id}&v=${v}`);
        setActiveMenuItem(v);
    }

    console.log(userData);

    if (initialized) {
        if (userData.data) {
            console.log(userData);
            return (  
                <UserData userdata={userData}> 
                    <div className="dashboardParentDiv" style={{height: '100%', width: '100%'}}>
                        <MenuMain activemenu={activeMenuItem} changemenu={handleChangeMenu} />
                        <DashboardActivity activity={activeMenuItem} />
                    </div>
                </UserData>
            );
        }
    }
    return (
        <div className="dashboardParentDiv">
            <Loader active inline /> 
        </div>
    );
}

export default DashboardMain;