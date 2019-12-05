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
        <div style={{height: '5%', width: '100%'}}>
            <Menu style={{margin: 0}}>
                <Menu.Item
                    name='groups'
                    active={activeItem === 'groups'}
                    onClick={handleMenuItemClick}
                />
                <Menu.Item
                    name='join'
                    active={activeItem === 'join'}
                    onClick={handleMenuItemClick}
                />
            </Menu>
        </div>
    );
}

export default MenuMain;