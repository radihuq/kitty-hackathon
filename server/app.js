const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv/config');
const server = app.listen(process.env.SOCKET_PORT, () => {
    console.log(`Sockets.IO server up and running on port [${process.env.SOCKET_PORT}]`);
});

const SERVER_PORT = process.env.PORT;
const DB_CONNECTION = process.env.DB_CONNECTION;

//Connect to DB
mongoose.connect(DB_CONNECTION, {useNewUrlParser: true, useUnifiedTopology: true}, () => {
    console.log(`Connected to Database - State: ${mongoose.connection.readyState}`)
});

//Middlewares
app.use(cors());
app.use(express.json());

//Import Routes
const registerRoute = require('./routes/Register');
app.use(`/api`, registerRoute);
const loginRoute = require('./routes/Login');
app.use(`/api`, loginRoute);
const loadRoute = require('./routes/Load');
app.use(`/api/load`, loadRoute);
const dashboardRoute = require('./routes/Dashboard');
app.use(`/api/dashboard`, dashboardRoute);
const groupRoute = require('./routes/Group');
app.use(`/api/group`, groupRoute);
const authRoute = require('./routes/Auth');
app.use(`/api/auth`, authRoute);

//Socket.IO
const io = require('socket.io')(server, {
    path: '/kitty',
    serveClient: false
});

io.on('connection', (socket) => {

    // console.log(`[${socket.id}] connected`);

    socket.on('socket_init', (payload) => {
        console.log(`[${socket.id}] connected to Kitty ${payload.customerid}`);

        socket.join(payload.customerid, (err) => {
            if (err) {
                console.log(err);
            }

            // console.log(Object.keys(socket.rooms));
        })
    });

    socket.on('UPDATE_BALANCE', (payload) => {
        // console.log(`update balance called`);
        // console.log(payload);
        io.in(`${payload.customerid}`).emit('UPDATE_BALANCE', payload);
    });

    socket.on('UPDATE_TRANSACTIONS', (payload) => {
        // console.log('update transactions called');
        // console.log(payload);
        io.in(`${payload.customerid}`).emit('UPDATE_TRANSACTIONS', payload);
    })

})


//Start Server
const os = require('os');

const interfaces = os.networkInterfaces();
const addresses = [];
for (let k in interfaces) {
    for (let k2 in interfaces[k]) {
        let address = interfaces[k][k2];
        if (address.family === 'IPv4' && !address.internal) {
            addresses.push(address.address);
        }
    }
}

app.listen(SERVER_PORT, () => {
    console.log(`Kitty server up and running on port [${SERVER_PORT}] (Network IP: ${addresses[0]})`);
});