import React, {useState} from 'react';
import {useHistory} from 'react-router-dom';
import axios from 'axios';

import {Icon, Form, Button} from 'semantic-ui-react';

const RegisterMain = () => {

    const [userInput, setUserInput] = useState({email: '', password: ''});
    const [buttonLoading, setButtonLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const history = useHistory();

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

        axios.post(`${process.env.REACT_APP_SERVER}/api/register`, data)
        .then((res) => {
            console.log(res);
            sessionStorage.setItem('registerEmail', userInput.email);
            history.push(`/login`);
            setButtonLoading(false);
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
        <div className="registerFormDiv">
            <p className="formBackButton" onClick={handleGoBackClick}><Icon name='long arrow alternate left' /> Back</p>
            <p className="formHeaderText">Register an account</p>
            <Form onSubmit={handleRegisterSubmit} style={{display: 'flex', flexDirection: 'column'}}>
                <label style={{fontSize: '1.5em', marginBottom: '0.25em'}}>Email<span className="formRequiredLabel">*</span></label>
                <Form.Input fluid placeholder='john.doe@gmail.com' required onChange={handleUserInputChange} id='email' value={userInput.email} style={{margin: 0, fontSize: '1.5em'}} />
                
                <label style={{fontSize: '1.5em', marginBottom: '0.25em'}}>Password<span className="formRequiredLabel">*</span></label>
                <Form.Input type='password' fluid required onChange={handleUserInputChange} id='password' value={userInput.password} style={{margin: 0, fontSize: '1.5em'}} />
                <Button loading={buttonLoading} disabled={buttonLoading} type='submit' style={{fontSize: '1.5em'}}>Create Account</Button>
                <p className="formErrorMessage">{errorMessage}</p>
            </Form>
        </div>
    );
}

export default RegisterMain;