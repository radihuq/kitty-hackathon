import React, {useState, useContext, useEffect} from 'react';
import {useHistory} from 'react-router-dom';

import {CTX} from '../../../../Context/GroupData';

import GroupViewContributeModal from './GroupViewContributeModal';
import GroupViewWithdrawModal from './GroupViewWithdrawModal';

import {Input, Label, Button} from 'semantic-ui-react';

const qs = require('query-string');

const GroupViewActions = () => {

    const [fundInputValue, setFundInputValue] = useState('');
    const [buttonDisabled, setButtonDisabled] = useState(true);
    const [showContributeModal, setShowContributeModal] = useState(false);
    const [showWithdrawModal, setShowWithdrawModal] = useState(false);
    const {groupData} = useContext(CTX);

    const history = useHistory();

    useEffect(() => {
        if (fundInputValue === '') {
            if (!buttonDisabled) {
                setButtonDisabled(true);
            }
        } else if (Number(fundInputValue) <= 0) {
            if (!buttonDisabled) {
                setButtonDisabled(true);
            }
        } else {
            if (buttonDisabled) {
                setButtonDisabled(false);
            }
        }
    });

    let query = qs.parse(history.location.search);

    let balance = 0;

    let loop = groupData.data.transactions;
    for (let i=0; i < loop.length; i++) {
        if (loop[i].user === sessionStorage.getItem('kittyuserid')) {
            if (loop[i].type === 'contribute') {
                balance += Number(loop[i].amount);
            }
            if (loop[i].type === 'withdraw') {
                balance -= Number(loop[i].amount);
            }
        }
    }

    const handleFundInputValueChange = (e) => {
        setFundInputValue(e.target.value);
    }

    const handleFundInputValueBlur = (e) => {
        let newValue = Number(fundInputValue);
        if (newValue < 0) {
            setFundInputValue('');
            return;
        }

        if (newValue === 0) {
            setFundInputValue('');
            return;
        }

        newValue = newValue.toFixed(2);
        setFundInputValue(newValue);
    }

    const resetInput = () => {
        setFundInputValue('');
    }

    const handleContributeModalClose = () => {
        setShowContributeModal(!showContributeModal);
    }

    const handleWithdrawModalClose = () => {
        setShowWithdrawModal(!showWithdrawModal);
    }

    const handleActionItemClick = (e) => {
        const type = e.target.id;
        if (type === 'contribute') {
            setShowContributeModal(true);
        }

        if (type === 'withdraw') {
            setShowWithdrawModal(true);
        }
        // history.push(`?id=${query.id}&v=${query.v}&g=${query.g}&actions=${e.target.id}`);
    }

    return (
        <div style={{height: '100%', width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
            
            <GroupViewContributeModal modalopen={showContributeModal} handleclosemodal={handleContributeModalClose} reset={resetInput} amount={fundInputValue} />
            <GroupViewWithdrawModal modalopen={showWithdrawModal} handleclosemodal={handleWithdrawModalClose} reset={resetInput} amount={fundInputValue} />
            
            <Input 
            type='number'
            icon='dollar sign'
            iconPosition='left'
            placeholder='100.00' 
            style={{width: '80%', fontSize: '2em', marginTop: '0.25em'}}
            value={fundInputValue}
            step="0.1"
            onChange={handleFundInputValueChange}
            onBlur={handleFundInputValueBlur}
            />
            <p style={{textAlign: 'left', marginBottom: '1em', width: '80%'}}>Your funds: ${balance.toFixed(2)}</p>
            <Button compact fluid style={{justifySelf: 'end', width: '80%', fontSize: '1em', padding: '1em', margin: '0.5em 0'}} onClick={handleActionItemClick} id='contribute' disabled={buttonDisabled} >Contribute Funds</Button>
            <Button compact fluid style={{justifySelf: 'end', width: '80%', fontSize: '1em', padding: '1em', margin: '0.5em 0'}} onClick={handleActionItemClick} id='withdraw' disabled={((balance < fundInputValue ? true : buttonDisabled))} >Withdraw Funds</Button>
        </div>
    );
}

export default GroupViewActions;