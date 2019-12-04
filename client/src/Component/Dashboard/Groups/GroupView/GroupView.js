import React, {useState} from 'react';
import {useHistory} from 'react-router-dom';
import axios from 'axios';

import GroupData from '../../../../Context/GroupData';

import GroupViewMain from './GroupViewMain';

const GroupView = () => {

    const [initialized, setInitialized] = useState(false);
    const [loadingData, setLoadingData] = useState(false);
    const [groupData, setGroupData] = useState({});
    const [bankData, setBankData] = useState({});

    const history = useHistory();

    if (!initialized) {
        if (!loadingData) {
            setLoadingData(true);

            axios.post(`${process.env.REACT_APP_SERVER}/api/load/kitty`)
            .then((res) => {
                console.log(res);
                setGroupData(res.data.response);
                setInitialized(true);

                // const headers = {
                //     'Content-Type': 'application/json',
                //     'Authorization': sessionStorage.getItem('oauth')
                // }
                // let consumerId = res.data.customerid; 
                // axios.get(`https://api.preprod.fusionfabric.cloud/retail-us/account/v1/consumers/${consumerId}/accounts/extended`, {headers: headers})
                // .then((res) => {
                //     console.log(res);
                //     setBankData(res.data);
                //     setInitialized(true);
                // })
                // .catch((err) => {
                //     console.log(err);
                //     setInitialized(true);
                // })


            })
            .catch((err) => {
                console.log(err);
                setInitialized(true);
            });
        }
    }

    if (initialized) {
        return (
            <GroupData groupdata={groupData}>
                <GroupViewMain bankdata={bankData} />
            </GroupData>
        );
    }

    return (
        <div>
            <p>Loading...</p>
        </div>
    )

}

export default GroupView;