import React, {useState, useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import axios from 'axios';

import {Icon, Form, Button} from 'semantic-ui-react';

const LoginMain = () => {

    const [userInput, setUserInput] = useState({email: '', password: ''});
    const [buttonLoading, setButtonLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const history = useHistory();

    useEffect(() => {
        if (sessionStorage.getItem('registerEmail')) {
            setUserInput({...userInput, email: sessionStorage.getItem('registerEmail')});
            sessionStorage.removeItem('registerEmail');
        }
    })

    const handleUserInputChange = (e) => {
        let input = e.target.value;
        let inputType = e.target.id;

        if (inputType === 'email') {
            setUserInput({...userInput, email: input});
        }

        if (inputType === 'password') {
            setUserInput({...userInput, password: input});
        }
    }

    const handleRegisterSubmit = (e) => {
        e.preventDefault();
        setErrorMessage('');
        setButtonLoading(true);

        const data = {
            email: userInput.email,
            password: userInput.password
        }

        axios.post(`${process.env.REACT_APP_SERVER}/api/login`, data)
        .then((res) => {
            console.log(res);
            
            if (res.status === 201) {
                setErrorMessage('Incorrect email/password combination. Please try again');
                setButtonLoading(false);
            }

            if (res.status === 200) {
                sessionStorage.setItem('kittyuserid', res.data.response.id)
                history.push(`/dashboard?id=${res.data.response.id}&v=overview`);
                setButtonLoading(false);
            }
        })
        .catch((err) => {
            console.log(err);
            setErrorMessage(`Error: ${err}`);
            setButtonLoading(false);
        })
    }

    const handleGoBackClick = () => {
        history.push(`/`);
    }

    return (
        <div className="loginFormDiv">
            <p className="formBackButton" onClick={handleGoBackClick}><Icon name='long arrow alternate left' /> Back</p>
            <p className="formHeaderText">Log in to Kitty</p>
            <Form onSubmit={handleRegisterSubmit} style={{display: 'flex', flexDirection: 'column'}}>
                <label style={{fontSize: '1.5em', marginBottom: '0.25em'}}>Email<span className="formRequiredLabel">*</span></label>
                <Form.Input fluid placeholder='john.doe@gmail.com' required onChange={handleUserInputChange} id='email' value={userInput.email} style={{margin: 0, fontSize: '1.5em'}} />
                
                <label style={{fontSize: '1.5em', marginBottom: '0.25em'}}>Password<span className="formRequiredLabel">*</span></label>
                <Form.Input type='password' fluid required onChange={handleUserInputChange} id='password' value={userInput.password} style={{margin: 0, fontSize: '1.5em'}} />
                <Button loading={buttonLoading} disabled={buttonLoading} type='submit' style={{fontSize: '1.5em'}}>Log In</Button>
                <p className="formErrorMessage">{errorMessage}</p>
            </Form>
        </div>
    );
}

export default LoginMain;