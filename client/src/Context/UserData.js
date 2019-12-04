import React, {useReducer, createContext} from 'react';

export const CTX = createContext();

const reducer = (state, action) => {
    console.log(state);
    console.log(action);
    switch (action.type) {
        case 'UPDATE_GROUPS':
            let newGroups = state.data.groups;
            newGroups.push(action.payload);
            console.log(state.data.groups);
            console.log(newGroups);
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

    console.log(props);
    console.log(props.userdata);
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