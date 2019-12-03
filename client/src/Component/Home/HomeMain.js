import React, {useState} from 'react';
import {useHistory} from 'react-router-dom';

const HomeMain = () => {

    const history = useHistory();

    const handleLinkClick = (e) => {
        history.push(`/${e.target.id}`);
    }

    return (
        <div>
            <p onClick={handleLinkClick} id='register'>Click here to register</p>
            <p onClick={handleLinkClick} id='login'>Click here to log in</p>
        </div>
    );
}

export default HomeMain;