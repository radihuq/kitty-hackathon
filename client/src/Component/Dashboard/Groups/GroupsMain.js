import React, {useState} from 'react';
import './Groups.css';

import GroupsNewGroupModal from './GroupsNewGroupModal';

import {Button, Card} from 'semantic-ui-react';

const GroupsMain = () => {

    const [newGroupModalOpen, setNewGroupModalOpen] = useState(false);

    const handleNewGroupModalClose = () => {
        setNewGroupModalOpen(!newGroupModalOpen);
    }

    return (
        <div className="groupsParentDiv">

            <GroupsNewGroupModal modalopen={newGroupModalOpen} handlemodalclose={handleNewGroupModalClose} />

            <Button fluid size='large' style={{marginTop: '1em', width: '80%'}} onClick={handleNewGroupModalClose}>New Group</Button>
            <div className="currentGroupsContainer">
                <p style={{textAlign: 'left'}}>My Groups</p>

                <Card fluid style={{margin: 0}}>
                    <Card.Content>
                        <Card.Header style={{fontSize: '1em'}}>New York Trip 2019</Card.Header>
                        <Card.Meta style={{fontSize: '1em'}}>5 members</Card.Meta>
                    </Card.Content>
                    <Card.Content extra style={{margin: 0}}>
                        <Button primary>Enter</Button>
                        <Button secondary>Info</Button>
                    </Card.Content>
                </Card>

            </div>
        </div>
    );
}

export default GroupsMain;