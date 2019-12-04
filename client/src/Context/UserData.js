import React, {useReducer, createContext} from 'react';

export const CTX = createContext();

const reducer = (state, action) => {
    switch (action.type) {
        case 'UPDATE_FEED':
            let newGroups = state.data.groups;
            newGroups.push(action.payload);

            return {
                ...state,
                data: {
                    ...state.data,
                    groups: newGroups
                }
            }
        default:
            return state;
    }
}

export default function UserData (props) {

    const [userData, dispatch] = useReducer(reducer, props.userdata);

    function updateGroups (data) {
        dispatch({type: 'UPDATE_GROUPS', payload: data});
    }

    // function updateFeed (data) {
    //     dispatch({type: 'UPDATE_FEED', payload: data});
    // }

    console.log(userData);
    return (
        <CTX.Provider value={{userData, updateGroups}}>
            {props.children}
        </CTX.Provider>
    )
}