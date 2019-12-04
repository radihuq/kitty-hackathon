import React, {useState, useEffect, lazy, Suspense} from 'react';
import {useHistory} from 'react-router-dom';

const qs = require('query-string');

const DashboardActivity = ({activity}) => {

    console.log(activity);
    
    const [MainComponent, setMainComponent] = useState(lazy(() => import('./Overview/OverviewMain')));
    const [initialized, setInitialized] = useState(false);
    const [prevActivity, setPrevActivity] = useState('overview');

    const history = useHistory();

    if (!initialized) {
        setInitialized(true);
    }

    if (initialized) {

        let ActiveComponent;

        if (activity === 'overview') {
            ActiveComponent = lazy(() => import('./Overview/OverviewMain'));
        } else if (activity === 'profile') {
            ActiveComponent = lazy(() => import('./Profile/ProfileMain'));
        } else if (activity === 'groups') {
            ActiveComponent = lazy(() => import('./Groups/GroupsMain'));
        }

        return (
            <Suspense fallback={<div>Loading...</div>}>
                <ActiveComponent />
            </Suspense>
        );
    }

    return (
        <div>
            <p>Loading...</p>
        </div>
    );
}

export default DashboardActivity;