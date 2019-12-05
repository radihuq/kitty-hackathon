import React, {useState, useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import axios from 'axios';
import QrReader from 'react-qr-reader';
import './Join.css';

import {Input, Icon, Segment, Divider} from 'semantic-ui-react';

const qs = require('query-string');

const JoinMain = () => {

    const [codeInput, setCodeInput] = useState('');
    const [codeInputDisabled, setCodeInputDisabled] = useState(false);
    const [codeIconLoading, setCodeIconLoading] = useState(false);
    const [instructionsText, setInstructionsText] = useState('');
    
    const history = useHistory();

    let query = qs.parse(history.location.search);

    const handleCodeInputChange = (e) => {
        setCodeInput(e.target.value);
    }

    const handleCodeInputKeyDown = (e) => {
        if (e.key === 'Enter') {
            joinGroup();
        }
    }

    const handleCodeInputIconClick = () => {
        joinGroup();
    }

    const handleScannerError = (err) => {
        setInstructionsText(`There was an error with the QR code scanner - ${err}`);
    }

    const handleScannerScan = (data) => {
        if (!codeInputDisabled) {
            console.log(data);
            if (data) {
                console.log(data);
                setCodeInput(data);
                joinGroup();
            }
        }
    }

    function joinGroup() {
        if (codeInput !== '') {
            setCodeInputDisabled(true);
            setCodeIconLoading(true);
            setInstructionsText('');

            const data = {
                customerid: codeInput,
                user: sessionStorage.getItem('kittyuserid') 
            }
    
            axios.post(`${process.env.REACT_APP_SERVER}/api/auth/kitty`, data)
            .then((res) => {
                console.log(res);
                if (res.status === 201) {
                    setCodeIconLoading(false);
                    setCodeInputDisabled(false);
                    setInstructionsText('No group found with that code! Please try again.');
                    return;
                }

                if (res.status === 200) {
                    setCodeIconLoading(false);
                    setCodeInputDisabled(false);
                    setCodeInput('');
                    history.push(`/dashboard?id=${query.id}&v=groups&g=${codeInput}`);
                }
            })
            .catch((err) => {
                console.log(err);
                setInstructionsText('There was an error - please try again.');
                setCodeIconLoading(false);
                setCodeInputDisabled(false);
    
            });
        }


        // console.log(`code input: ${codeInput}`);

        // const data = {
        //     code: codeInput
        // }

        // axios.post(`${process.env.REACT_APP_SERVER_ADDRESS}/api/tab/join`, data)
        // .then((res) => {
        //     if (res.status === 201) {
        //         setCodeIconLoading(false);
        //         setCodeInputDisabled(false);
        //         setInstructionsText('No tab found with that code! Please try again.');
        //         return;
        //     }

        //     if (res.status === 200) {
        //         setCodeIconLoading(false);
        //         setCodeInputDisabled(false);
        //         setCodeInput('');
        //         history.push(`/tab?id=${res.data.response.id}`);    
        //     }
        // })
        // .catch((err) => {
        //     console.log(err);
        //     setInstructionsText('There was an error - please try again.');
        //     setCodeIconLoading(false);
        //     setCodeInputDisabled(false);
        // })
    }

    return (
        <div className="JoinGroupParentDiv">
            <p className="JoinGroupText">Enter Group ID</p>

            <p className="JoinGroupInstructions">{instructionsText}</p>

            <Input
            size='huge'
            icon
            disabled={codeInputDisabled}
            loading={codeIconLoading}
            placeholder='Enter 6 digit code'
            style={{width: '80%'}}
            fluid
            onChange={handleCodeInputChange}
            onKeyDown={handleCodeInputKeyDown}
            value={codeInput}
            >
                <input />
                <Icon name='search' link={true} onClick={handleCodeInputIconClick} />
            </Input>

            <Divider />
            <p className="JoinGroupText">Or Scan QR Code</p>

            <div style={{marginTop: '1em', width: '80%', height: '80%'}}>
                <QrReader
                delay={300}
                onError={handleScannerError}
                onScan={handleScannerScan}
                />
            </div>
        </div>
    );
}

export default JoinMain;