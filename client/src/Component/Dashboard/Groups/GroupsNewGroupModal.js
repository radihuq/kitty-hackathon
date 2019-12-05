import React, {useState, useContext} from 'react';
import {useHistory} from 'react-router-dom';
import axios from 'axios';

import {CTX} from '../../../Context/UserData';

import {Button, Modal, Form, Radio} from 'semantic-ui-react';

const qs = require('query-string');

const GroupsNewGroupModal = ({modalopen, handlemodalclose}) => {

    const [newGroupInfo, setNewGroupInfo] = useState(
        {name: '', type: '', description: '', amount: 0, optOut: 0, paymentFrequency: 0}
    );
    const [buttonLoading, setButtonLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const {updateGroups} = useContext(CTX);

    const history = useHistory();

    let query = qs.parse(history.location.search);

    const handleNewGroupInfoChange = (e, {value}) => {
        let input = e.target.value;
        let inputType = e.target.id;

        if (inputType === 'name') {
            setNewGroupInfo({...newGroupInfo, name: input});
        }

        if (inputType === 'description') {
            setNewGroupInfo({...newGroupInfo, description: input});
        }

        if (inputType === 'amount') {
            setNewGroupInfo({...newGroupInfo, amount: input});
        }

        if (inputType === 'optOut') {
            setNewGroupInfo({...newGroupInfo, optOut: input});
        }

        if (inputType === 'paymentFrequency') {
            setNewGroupInfo({...newGroupInfo, paymentFrequency: input});
        }
    }

    const handleNewGroupTypeChange = (e, {value}) => {
        setNewGroupInfo({...newGroupInfo, type: value});
    }

    const handleNewGroupSubmit = (e) => {
        e.preventDefault();
        setErrorMessage('');
        setButtonLoading(true);

        // if (newGroupInfo.type === '') {
        //     setButtonLoading(false);
        //     setErrorMessage('Please select a Kitty type.');
        //     return;
        // }

        const groupData = {
            creator: query.id,
            name: newGroupInfo.name,
            type: newGroupInfo.type,
            description: newGroupInfo.description,
            optout: newGroupInfo.optOut,
            amount: newGroupInfo.amount,
            paymentfrequency: newGroupInfo.paymentFrequency
        }

        const headers = {
            'Content-Type': 'application/json',
            'Authorization': sessionStorage.getItem('oauth')
        }
        
        axios.post(`${process.env.REACT_APP_SERVER}/api/dashboard/kitty/create`, groupData, {headers: headers})
        .then((res) => {
            console.log(res);
            setNewGroupInfo({name: '', type: '', description: '', amount: 0, optOut: 0, paymentFrequency: 0});
            setButtonLoading(false);
            updateGroups(res.data.response);
            handlemodalclose();
        })
        .catch((err) => {
            setErrorMessage(`Error: ${err}`);
            setButtonLoading(false);
        });

        // const bankInfo = {
        //     branchCode: '',
        //     title: '',
        //     firstName: `${groupData.name}`,
        //     lastName: '',
        //     gender: '',
        //     countryOfResidency: 'Canada',
        //     kycCheckRequired: '',
        //     addresses: [],
        //     phoneNumbers: [],
        //     emailAddresses: []
        // }

        // createBankAccount(bankInfo);

        // function createBankAccount (bankInfo) {
        //     const headers = {
        //         'Content-Type': 'application/json',
        //         'Authorization': sessionStorage.getItem('oauth')
        //     }

        //     axios.post(`https://api.fusionfabric.cloud/retail-banking/customers/v1/personal-customers`, bankInfo, {headers: headers})
        //     .then((res) => {
        //         console.log(res);
        //         createKitty(groupData, res.data.response.customerid);
        //     })
        //     .catch((err) => {
        //         console.log(err);
        //     })
        // }

        // function createKitty(groupData, customerid) {
        //     const headers = {
        //         'Content-Type': 'application/json',
        //         'Authorization': sessionStorage.getItem('oauth')
        //     }

        //     groupData.customerid = customerid;

        //     axios.post(`${process.env.REACT_APP_SERVER}/api/dashboard/kitty/create`, groupData, {headers: headers})
        //     .then((res) => {
        //         console.log(res);
        //         if (res.status === 201) {
        //             alert ('There was a problem');
        //             setButtonLoading(false);
        //         }

        //         if (res.status === 200) {
        //             alert ('done');
        //             updateGroups(groupData);
        //             setNewGroupInfo({name: '', type: '', description: '', amount: 0, optOut: 0, paymentFrequency: 0});
        //             setButtonLoading(false);
        //         }
        //     })
        //     .catch((err) => {
        //         console.log(err);
        //         setButtonLoading(false);
        //     })
        // }

    }



    return (
        <Modal size='small' open={modalopen} onClose={handlemodalclose} centered={false} closeIcon>
            <Modal.Header>Create New Kitty Group</Modal.Header>
            <Modal.Content>
                <Form onSubmit={handleNewGroupSubmit}>
                    <label style={{fontSize: '1em', marginBottom: '0.25em'}}>Group Name<span className="formRequiredLabel">*</span></label>
                    <Form.Input required onChange={handleNewGroupInfoChange} value={newGroupInfo.name} id='name' style={{margin: 0, fontSize: '1em'}} />

                    {/* <label style={{fontSize: '1.5em', marginBottom: '0.25em'}}>Kitty Type<span className="formRequiredLabel">*</span></label>
                    <Form.Field style={{marginTop: '1em'}}>
                        <Radio
                        label='Short Term'
                        name='typeGroup'
                        value='short'
                        checked={newGroupInfo.type === 'short'}
                        onChange={handleNewGroupTypeChange}
                        style={{margin: 0, fontSize: '1.5em'}}
                        />
                    </Form.Field>
                    <Form.Field>
                        <Radio
                        label='Long Term'
                        name='typeGroup'
                        value='long'
                        checked={newGroupInfo.type === 'long'}
                        onChange={handleNewGroupTypeChange}
                        style={{margin: 0, fontSize: '1.5em'}}
                        />
                    </Form.Field> */}

                    <label style={{fontSize: '1em', marginBottom: '0.25em'}}>Group Description</label>
                    <Form.Input onChange={handleNewGroupInfoChange} value={newGroupInfo.description} id='description' style={{margin: 0, fontSize: '1em'}} />
{/* 
                    <label style={{fontSize: '1.5em', marginBottom: '0.25em'}}>Opt Out Period (Days After Group Created)</label>
                    <Form.Input type='days' onChange={handleNewGroupInfoChange} value={newGroupInfo.optOut} id='optOut' style={{margin: 0, fontSize: '1.5em'}} />

                    <label style={{fontSize: '1.5em', marginBottom: '0.25em'}}>Payment Amount (Dollars)</label>
                    <Form.Input type='days' onChange={handleNewGroupInfoChange} value={newGroupInfo.amount} id='amount' style={{margin: 0, fontSize: '1.5em'}} />

                    <label style={{fontSize: '1.5em', marginBottom: '0.25em'}}>Payment Frequency (Days)</label>
                    <Form.Input type='number' onChange={handleNewGroupInfoChange} value={newGroupInfo.paymentFrequency} id='paymentFrequency' style={{margin: 0, fontSize: '1.5em'}} />
 */}
                    <Button loading={buttonLoading} disabled={buttonLoading} fluid type='submit' style={{fontSize: '1em'}}>Create Group</Button>
                    <p className="formErrorMessage">{errorMessage}</p>
                </Form>

            </Modal.Content>
        </Modal>
    );
}

export default GroupsNewGroupModal;