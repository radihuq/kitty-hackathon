import React, {useState, useContext} from 'react';
import axios from 'axios';

import {CTX} from '../../../../Context/GroupData';

const GroupViewDetails = () => {

    const {groupData} = useContext(CTX);

    axios.request({
        url: "/login/v1/sandbox/oidc/token",
        method: "post",
        baseURL: "https://api.preprod.fusionfabric.cloud/",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        auth: {
            username: "2e84d46f-84c1-47e9-a799-b2c199bb3772",
            password: "1e98b6a2-5356-491d-b4cd-928a6b903bad",
        },
        data: 
            "grant_type=client_credentials&username=2e84d46f-84c1-47e9-a799-b2c199bb3772&password=1e98b6a2-5356-491d-b4cd-928a6b903bad"
    
    })
    .then((res) => {
        console.log(res);
        console.log(res.response);
    })
    .catch((err) => {
        console.log('@@@@@@@@@@@@@@ ERROR');
        console.log(err.response);
    });

    // axios.request({
    //     url: "/login/v1/sandbox/oidc/token",
    //     method: "post",
    //     baseURL: "https://api.preprod.fusionfabric.cloud/",
    //     auth: {
    //         username: "2e84d46f-84c1-47e9-a799-b2c199bb3772",
    //         password: "1e98b6a2-5356-491d-b4cd-928a6b903bad",
    //     },
    //     data: {
    //         "grant_type": "client_credentials"
    //     }
    // })
    // .then((res) => {
    //     console.log(res);
    //     // sessionStorage.setItem('oauth', res.data);
    //     // createBankAccount(bankInfo);
    // })
    // .catch((err) => {

    // });


    return (
        <div>
            <p>Group details</p>
            <p>{groupData.description}</p>
        </div>
    );
}

export default GroupViewDetails;