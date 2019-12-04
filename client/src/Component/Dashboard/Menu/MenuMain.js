import React, {useState} from 'react';
import {useHistory} from 'react-router-dom';

import {Menu} from 'semantic-ui-react';

const MenuMain = ({activemenu, changemenu}) => {

    const activeItem = activemenu;

    const history = useHistory();

    const handleMenuItemClick = (e, {name}) => {
        changemenu(name);
    }

    return (
        <Menu style={{margin: 0}}>
            <Menu.Item
                name='overview'
                active={activeItem === 'overview'}
                onClick={handleMenuItemClick}
            />
            <Menu.Item
                name='profile'
                active={activeItem === 'profile'}
                onClick={handleMenuItemClick}
            />
            <Menu.Item
                name='groups'
                active={activeItem === 'groups'}
                onClick={handleMenuItemClick}
            />
        </Menu>
    );
}

export default MenuMain;