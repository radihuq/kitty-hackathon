import React, {useState, useEffect, lazy, Suspense} from 'react';
import {useHistory} from 'react-router-dom';
import axios from 'axios';
import './Dashboard.css';

import UserData from '../../Context/UserData';

import MenuMain from './Menu/MenuMain';

import {Loader} from 'semantic-ui-react';

const qs = require('query-string');

const DashboardMain = () => {

    const [initialized, setInitialized] = useState(false);
    const [loadingData, setLoadingData] = useState(false);
    const [userData, setUserData] = useState({});
    const [activeMenuItem, setActiveMenuItem] = useState('');
    const [MainComponent, setMainComponent] = useState(lazy(() => import('./Overview/OverviewMain')));

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
                console.log(res);
                setUserData(res.response);
                setInitialized(true);
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
        if (v === 'overview') {
            let ActiveComponent = lazy(() => import('./Overview/OverviewMain'));
            setMainComponent(ActiveComponent);
        } else if (v === 'profile') {
            let ActiveComponent = lazy(() => import('./Profile/ProfileMain'));
            setMainComponent(ActiveComponent);
        } else if (v === 'groups') {
            let ActiveComponent = lazy(() => import('./Groups/GroupsMain'));
            setMainComponent(ActiveComponent);
        }
        setActiveMenuItem(v);
    }

    return (
        <div>
            {!initialized ? 
                <div className="dashboardParentDiv">
                    <Loader active inline /> 
                </div>
                :
                <div className="dashboardParentDiv">
                    <MenuMain activemenu={activeMenuItem} changemenu={handleChangeMenu} />
                    <UserData userdata={userData}>
                        <Suspense fallback={<div className="suspenseFallbackLoaderDiv"><Loader active inline /></div>}>
                            <MainComponent />
                        </Suspense>
                    </UserData>
                </div>
            }
        </div>
    );
}

export default DashboardMain;