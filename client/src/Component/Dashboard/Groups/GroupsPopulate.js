import React, {useState} from 'react';
import {useHistory} from 'react-router-dom';

import {Card, Button} from 'semantic-ui-react';

const qs = require('query-string');

const GroupsPopulate = ({groupdata}) => {

    // console.log(groupdata);

    const history = useHistory();

    let query = qs.parse(history.location.search);

    const handleEnterGroupClick = () => {
        history.push(`dashboard?id=${query.id}&v=${query.v}&g=${groupdata.customerid}`);
    }

    return (
        <Card fluid style={{margin: '0 0 1em 0'}}>
            <Card.Content>
                <Card.Header style={{fontSize: '1em'}}>{groupdata.name}</Card.Header>
                <Card.Meta style={{fontSize: '1em'}}>5 members</Card.Meta>
            </Card.Content>
            <Card.Content extra style={{margin: 0}}>
                <Button primary onClick={handleEnterGroupClick}>Enter</Button>
                {/* <Button secondary>Info</Button> */}
            </Card.Content>
        </Card>
    );
}

export default GroupsPopulate;