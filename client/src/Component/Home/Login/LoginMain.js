import React, {useState, useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import axios from 'axios';

const LoginMain = () => {

    const [userInput, setUserInput] = useState({email: '', password: ''});

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

        const data = {
            email: userInput.email,
            password: userInput.password
        }

        axios.post(`${process.env.REACT_APP_SERVER}/api/login`, data)
        .then((res) => {
            console.log(res);

            if (res.status === 201) {
                alert('Bad combination');
            }

            if (res.status === 200) {
                history.push(`/1223131fasfa`);
            }
        })
        .catch((err) => {
            console.log(err);
            alert(err);
        })
    }

    return (
        <div>
            <form onSubmit={handleRegisterSubmit}>
                <p>Email</p>
                <input type='text' onChange={handleUserInputChange} id='email' value={userInput.email} />
                <p>Password</p>
                <input type='password' onChange={handleUserInputChange} id='password' value={userInput.password} />
                <button type='submit'>Create Account</button>
            </form>
        </div>
    );
}

export default LoginMain;