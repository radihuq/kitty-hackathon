import React, {useState, useContext} from 'react';

import {CTX} from '../../../../Context/GroupData';

const GroupViewTransactions = () => {

    const {groupData} = useContext(CTX);

    return (
        <div>
            <p>Group transactions</p>
            {groupData.data.transactions.map((transaction, index) => (
            <p key={`transaction_${index}`}>{`[${transaction.user}] ${transaction.type}: ${transaction.amount}`}</p>
            ))}
        </div>
    );
}

export default GroupViewTransactions;