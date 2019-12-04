import React, {useState, useContext} from 'react';
import './Groups.css';

import {CTX} from '../../../Context/UserData';

import GroupsNewGroupModal from './GroupsNewGroupModal';
import GroupsPopulate from './GroupsPopulate';

import {Button, Card} from 'semantic-ui-react';

const GroupsMain = () => {

    const [newGroupModalOpen, setNewGroupModalOpen] = useState(false);
    const {userData} = useContext(CTX);

    const handleNewGroupModalClose = () => {
        setNewGroupModalOpen(!newGroupModalOpen);
    }

    return (
        <div className="groupsParentDiv">

            <GroupsNewGroupModal modalopen={newGroupModalOpen} handlemodalclose={handleNewGroupModalClose} />

            <Button fluid size='large' style={{marginTop: '1em', width: '80%'}} onClick={handleNewGroupModalClose}>New Group</Button>
            <div className="currentGroupsContainer">
                <p style={{textAlign: 'left'}}>My Groups</p>
                {userData.data.groups.map((group, index) => (
                    <GroupsPopulate groupdata={group} key={`group_${index}`} />
                ))}
            </div>
        </div>
    );
}

export default GroupsMain;