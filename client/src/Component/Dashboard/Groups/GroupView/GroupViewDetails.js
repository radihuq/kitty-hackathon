import React, {useState, useContext} from 'react';
import axios from 'axios';
import '../Groups.css';

import {CTX} from '../../../../Context/GroupData';

import GroupViewInviteModal from './GroupViewInviteModal';

import {Button} from 'semantic-ui-react';

const GroupViewDetails = () => {

    const [inviteModalOpen, setInviteModalOpen] = useState(false);
    const {groupData} = useContext(CTX);

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

    const handleInviteModalOpenChange = () => {
        setInviteModalOpen(!inviteModalOpen);
    }


    return (
        <div style={{display: 'flex', flexDirection: 'column'}}>
            <GroupViewInviteModal modalopen={inviteModalOpen} modalopenchange={handleInviteModalOpenChange} />

            <Button fluid compact style={{marginBottom: '1em'}} onClick={handleInviteModalOpenChange}>Invite Link</Button>
            <p style={{margin: 0}}>Group details</p>
            <p style={{margin: 0}}>{groupData.description}</p>
        </div>
    );
}

export default GroupViewDetails;