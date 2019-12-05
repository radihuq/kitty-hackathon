import React, {useReducer, createContext} from 'react';
import io from 'socket.io-client';

export const CTX = createContext();

const reducer = (state, action) => {
    switch (action.type) {
        case 'UPDATE_BALANCE':
            let newBalance = Number(state.fundsBalance);
            if (action.payload.type === 'contribute') {
                newBalance += Number(action.payload.amount);
            }
            if (action.payload.type === 'withdraw') {
                newBalance -= Number(action.payload.amount);
            }
            return {
                ...state, 
                fundsBalance: newBalance
            }
        case 'UPDATE_TRANSACTIONS':
            console.log(state.data.transactions);
            console.log(action.payload);
            let newTransactions = state.data.transactions;
            newTransactions.push(action.payload);
            return {
                ...state,
                data: {
                    ...state.data,
                    transactions: newTransactions
                }
            }
        default:
            return state;
    }
}

let socket;

export default function GroupData (props) {

    const [groupData, dispatch] = useReducer(reducer, props.groupdata);

    // console.log(groupData);
    // console.log(groupData.customerid);

    if (!socket) {
        socket = io(process.env.REACT_APP_SOCKETS, {
            path: '/kitty'
        });

        socket.emit('socket_init', {
            customerid: groupData.customerid
        });

        socket.on('UPDATE_BALANCE', (payload) => {
            console.log(`balace socket called`);
            updateBalance(payload);
        });

        socket.on('UPDATE_TRANSACTIONS', (payload) => {
            console.log(`transacitions socket called`);
            updateTransactions(payload);
        })
    }

    function socketsUpdateBalance (data) {
        socket.emit('UPDATE_BALANCE', data);
        // updateBalance(data);
    }

    function socketsUpdateTransactions (data) {
        socket.emit('UPDATE_TRANSACTIONS', data);
        // updateTransactions(data);
    }

    function updateBalance (data) {
        dispatch({type: 'UPDATE_BALANCE', payload: data});
    }

    function updateTransactions (data) {
        dispatch({type: 'UPDATE_TRANSACTIONS', payload: data});
    }



    // function updateFeed (data) {
    //     dispatch({type: 'UPDATE_FEED', payload: data});
    // }

    // console.log(groupData);
    return (
        <CTX.Provider value={{groupData, updateBalance, updateTransactions, socketsUpdateBalance, socketsUpdateTransactions}}>
            {props.children}
        </CTX.Provider>
    )
}