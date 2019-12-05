import React, {useState} from 'react';
import {useHistory} from 'react-router-dom';
import axios from 'axios';
import './Home.css';

import HomeImage from '../../Assets/Home/HomeImage.svg';

import {Button, Image} from 'semantic-ui-react';

const HomeMain = () => {

    const history = useHistory();

    const handleLinkClick = (e) => {
        history.push(`/${e.target.id}`);
    }

    const data = {
        email: 'random@email.com',
        password: 'password123'
    }

    axios.post(`${process.env.REACT_APP_SERVER}/api/register`, data)
    .then((res) => {
        console.log(res);
        sessionStorage.setItem('kittyuserid', res.data.response.id)
        history.push(`/dashboard?id=${sessionStorage.getItem('kittyuserid')}&v=groups`);
    })
    .catch((err) => {
        console.log(err);
    })

    return (
        <div className="HomeParentDiv">
            <p>Loading...</p>
            {/* <div className="HomeImage">
                <Image src={HomeImage} style={{maxHeight: '70%', maxWidth: '70%'}} />
            </div>
            <div className="HomeText">
                <h1>Lorem Ipsum</h1>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
            </div>
            <div className="HomeCTA">
                <Button primary onClick={handleLinkClick} id='login' size='large' fluid style={{margin: '0.5em'}}>Log In</Button>
                <Button secondary onClick={handleLinkClick} id='register' size='large' fluid style={{margin: '0.5em'}}>Register</Button>
            </div> */}
        </div>
    );
}

export default HomeMain;