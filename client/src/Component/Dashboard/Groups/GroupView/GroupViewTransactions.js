import React, {useState, useContext} from 'react';

import {CTX} from '../../../../Context/GroupData';

const GroupViewTransactions = () => {

    const {groupData} = useContext(CTX);

    return (
        <div>
            <p>Group transactions</p>
            {groupData.data.transactions.reverse().map((transaction, index) => (
                transaction.type === 'withdraw' ?
                    <p key={`transaction_${index}`} style={{color: 'red'}}>{`[${transaction.user}] ${transaction.type}: ${transaction.amount}`}</p>
                :
                    <p key={`transaction_${index}`} style={{color: 'green'}}>{`[${transaction.user}] ${transaction.type}: ${transaction.amount}`}</p>
                
            ))}
        </div>
    );
}

export default GroupViewTransactions;