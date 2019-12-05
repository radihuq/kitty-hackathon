import React, {useState, useContext} from 'react';
import {useHistory} from 'react-router-dom';
import axios from 'axios';

import {CTX} from '../../../../Context/GroupData';

import GroupViewActions from './GroupViewActions';
import GroupViewTransactions from './GroupViewTransactions';
import GroupViewDetails from './GroupViewDetails';

import {Statistic, Button, Menu} from 'semantic-ui-react';

const qs = require('query-string');

const GroupViewMain = ({bankdata}) => {

    const [activeItem, setActiveItem] = useState('transactions');
    const {groupData} = useContext(CTX);
    const [bankData, setBankData] = useState(bankdata);

    const history = useHistory();

    const handleMenuItemClick = (e, {name}) => {
        setActiveItem(name);
    }

    let query = qs.parse(history.location.search);

    const handleActionsClick = () => {
        history.push(`?id=${query.id}&v=${query.v}&g=${query.g}&actions=view`);
    }

    // console.log(groupData);

    return (
        <div className="groupViewParentDiv" style={{height: '100%', width: '100%'}}>
            {query.actions === 'view' ? 
                <GroupViewActions />
            :
            <div style={{display: 'flex', flexDirection: 'column'}}>
                <div style={{padding: '1em'}}>
                    <p style={{margin: 0, fontSize: '1.5em'}}>{groupData.name}</p>
                    <p style={{margin: 0}}>{groupData.description}</p>
                </div>
                
                <Statistic>
                    {/* <Statistic.Value>$14,200.00</Statistic.Value> */}
                    <Statistic.Value>${Number(groupData.fundsBalance).toFixed(2)}</Statistic.Value>
                    {/* <Statistic.Value>{bankData[0].balances[0].amount}</Statistic.Value> */}
                    <Statistic.Label>Current Funds</Statistic.Label>
                </Statistic>

                <Button style={{width: '80%', margin: '0 auto'}} onClick={handleActionsClick}>Actions</Button>

                <div style={{padding: '1em'}}>
                    <Menu fluid style={{margin: 0, textAlign: 'center'}}>
                        <Menu.Item
                            name='transactions'
                            active={activeItem === 'transactions'}
                            onClick={handleMenuItemClick}
                            style={{width: '50%', textAlign: 'center'}}
                        />
                        <Menu.Item
                            name='details'
                            active={activeItem === 'details'}
                            onClick={handleMenuItemClick}
                            style={{width: '50%', textAlign: 'center'}}
                        />
                    </Menu>

                    <div style={{marginTop: '1em'}}>
                        {activeItem === 'transactions' ? 
                        // <GroupViewTransactions accountid={bankData[0].accountId} />
                        <GroupViewTransactions />
                        :
                        <GroupViewDetails />
                        }
                    </div>
                </div>
            </div>
            }
        </div>
    );
}

export default GroupViewMain;