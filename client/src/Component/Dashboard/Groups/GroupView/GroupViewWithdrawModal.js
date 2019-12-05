import React, {useState, useContext} from 'react';
import {useHistory} from 'react-router-dom';
import axios from 'axios';

import {CTX} from '../../../../Context/GroupData';

import {Modal, Button} from 'semantic-ui-react';

const qs = require('query-string');

const GroupViewWithdrawModal = ({modalopen, handleclosemodal, reset, amount}) => {

    const [buttonLoading, setButtonLoading] = useState(false);
    const {updateBalance, updateTransactions, socketsUpdateBalance, socketsUpdateTransactions} = useContext(CTX);

    const history = useHistory();
    let query = qs.parse(history.location.search);

    const handleConfirmContributeClick = () => {
        setButtonLoading(true);

        const data = {
            userid: sessionStorage.getItem('kittyuserid'),
            amount: amount,
            type: 'withdraw',
            customerid: query.g
        }

        axios.post(`${process.env.REACT_APP_SERVER}/api/group/contribute`, data)
        .then((res) => {
            console.log(res);
            socketsUpdateBalance({type: 'withdraw', amount: amount, customerid: data.customerid});
            // updateBalance({type: 'withdraw', amount: amount});
            
            let transactionDetails = {
                type: data.type,
                amount: data.amount,
                user: data.userid,
                customerid: data.customerid
            }

            socketsUpdateTransactions(transactionDetails);
            // updateTransactions(transactionDetails);
            reset();
            handleclosemodal();
            setButtonLoading(false);
            history.push(`?id=${query.id}&v=${query.v}&g=${query.g}`);
        })
        .catch((err) => {
            console.log(err);
            alert('There was an error!');
            setButtonLoading(false);
        })
    }

    return(
        <Modal open={modalopen} onClose={handleclosemodal} size='small' centered={false} closeIcon>
            <Modal.Header>Withdraw Funds?</Modal.Header>
            <Modal.Description>
                <p>{`Are you sure you want to withdraw ${amount} from this group?`}</p>
            </Modal.Description>
            <Modal.Actions>
                <Button loading={buttonLoading} negative onClick={handleclosemodal}>No</Button>
                <Button loading={buttonLoading} positive onClick={handleConfirmContributeClick}>Yes</Button>
            </Modal.Actions>
        </Modal>
    );
}

export default GroupViewWithdrawModal;