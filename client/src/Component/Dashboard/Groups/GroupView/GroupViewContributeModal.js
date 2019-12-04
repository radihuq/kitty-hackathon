import React from 'react';

import {Modal, Button} from 'semantic-ui-react';

const GroupViewContributeModal = ({modalopen, handleclosemodal, amount}) => {

    return(
        <Modal open={modalopen} onClose={handleclosemodal} size='small' centered={false} closeIcon>
            <Modal.Header>Contribute Funds?</Modal.Header>
            <Modal.Description>
                <p>{`Are you sure you want to contribute ${amount} to this group?`}</p>
            </Modal.Description>
            <Modal.Actions>
                <Button negative onClick={handleclosemodal}>No</Button>
                <Button positive>Yes</Button>
            </Modal.Actions>
        </Modal>
    );
}

export default GroupViewContributeModal;