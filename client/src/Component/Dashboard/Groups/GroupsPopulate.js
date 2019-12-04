import React, {useState} from 'react';
import {useHistory} from 'react-router-dom';

import {Card, Button} from 'semantic-ui-react';

const GroupsPopulate = ({groupdata}) => {

    // console.log(groupdata);

    return (
        <Card fluid style={{margin: '0 0 1em 0'}}>
            <Card.Content>
                <Card.Header style={{fontSize: '1em'}}>{groupdata.name}</Card.Header>
                <Card.Meta style={{fontSize: '1em'}}>5 members</Card.Meta>
            </Card.Content>
            <Card.Content extra style={{margin: 0}}>
                <Button primary>Enter</Button>
                <Button secondary>Info</Button>
            </Card.Content>
        </Card>
    );
}

export default GroupsPopulate;