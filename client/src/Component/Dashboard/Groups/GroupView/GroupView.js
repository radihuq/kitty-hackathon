import React, {useState} from 'react';
import {useHistory} from 'react-router-dom';
import axios from 'axios';

import GroupData from '../../../../Context/GroupData';

import GroupViewMain from './GroupViewMain';
const qs = require('query-string');

const GroupView = () => {

    const [initialized, setInitialized] = useState(false);
    const [loadingData, setLoadingData] = useState(false);
    const [groupData, setGroupData] = useState({});
    const [bankData, setBankData] = useState({});

    const history = useHistory();
    let query = qs.parse(history.location.search);

    if (!initialized) {
        if (!loadingData) {
            setLoadingData(true);

            let data = {
                customerid: query.g
            }

            axios.post(`${process.env.REACT_APP_SERVER}/api/load/kitty`, data)
            .then((res) => {
                console.log(res);

                let groupData = res.data.response;
                let tmpBalance = 0;
                let loop = res.data.response.data.transactions;
                for (let i=0; i < loop.length; i++) {
                    if (loop[i].type === 'contribute') {
                        tmpBalance += Number(loop[i].amount);
                    }
                    if (loop[i].type === 'withdraw') {
                        tmpBalance -= Number(loop[i].amount);
                    }
                }
                console.log(`tmp balance: ${tmpBalance}`);
                groupData.fundsBalance = tmpBalance.toFixed(2);
                setGroupData(groupData);
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