import React, {useState, useEffect, lazy, Suspense} from 'react';
import {useHistory} from 'react-router-dom';

import GroupView from './Groups/GroupView/GroupView';

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

    let query = qs.parse(history.location.search);

    if (initialized) {

        let ActiveComponent;

        if (activity === 'groups') {
            ActiveComponent = lazy(() => import('./Groups/GroupsMain'));
        } else if (activity === 'join') {
            ActiveComponent = lazy(() => import('./Join/JoinMain'));
        }

        return (
            <div style={{height: '95%', width: '100%'}}>
                {(query.g) ? 
                    <GroupView />
                :
                    <Suspense fallback={<div>Loading...</div>}>
                        <ActiveComponent />
                    </Suspense>
                }
            </div>
        );
    }

    return (
        <div>
            <p>Loading...</p>
        </div>
    );
}

export default DashboardActivity;