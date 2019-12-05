import React, {useState, useEffect} from 'react';
import {useHistory} from 'react-router-dom';

import {Modal, Segment} from 'semantic-ui-react';

const QRCode = require('qrcode.react');
const qs = require('query-string');

const GroupViewInviteModal = ({modalopen, modalopenchange}) => {

    const [modalOpen, setModalOpen] = useState(false);

    const history = useHistory();

    let query = qs.parse(history.location.search);
    let group_id = query.g;
    
    useEffect(() => {
        setModalOpen(modalopen);
    });

    const handleModalClose = () => {
        modalopenchange();
    }

    return (
        <Modal size='small' open={modalOpen} onClose={handleModalClose} closeIcon>
            <Modal.Header>Invite Your Peers</Modal.Header>
            <Modal.Content>
                <div className="dGroupInviteDiv">
                    <p className="dGroupInviteText">Share this code</p>
                    <Segment style={{width: '40%'}}>
                        <p className="dGroupInviteText" style={{fontWeight: 600}}>{group_id}</p>
                    </Segment>
                    <p className="dGroupInviteText">or show this QR code</p>
                    <QRCode
                    value={group_id}
                    size={200}
                    style={{margin: '1em'}}
                    />
                </div>
            </Modal.Content>
        </Modal>
    )
}

export default GroupViewInviteModal;