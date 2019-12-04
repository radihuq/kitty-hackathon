import React, {useReducer, createContext} from 'react';

export const CTX = createContext();

const reducer = (state, action) => {
    switch (action.type) {
        default:
            return state;
    }
}

export default function UserData (props) {

    const [groupData, dispatch] = useReducer(reducer, props.groupdata);


    // function updateFeed (data) {
    //     dispatch({type: 'UPDATE_FEED', payload: data});
    // }

    console.log(groupData);
    return (
        <CTX.Provider value={{groupData}}>
            {props.children}
        </CTX.Provider>
    )
}