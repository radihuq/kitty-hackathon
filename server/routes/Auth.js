const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const UserAccountModel = require('../models/UserAccountModel');
const KittyModel = require('../models/KittyModel');
const axios = require('axios');

router.get('/verify', async (req, res) => {
    try {
    axios.request({
        url: "/login/v1/sandbox/oidc/token",
        method: "post",
        baseURL: "https://api.preprod.fusionfabric.cloud/",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        auth: {
            username: "2e84d46f-84c1-47e9-a799-b2c199bb3772",
            password: "1e98b6a2-5356-491d-b4cd-928a6b903bad",
        },
        data: 
            "grant_type=client_credentials&username=2e84d46f-84c1-47e9-a799-b2c199bb3772&password=1e98b6a2-5356-491d-b4cd-928a6b903bad"
    
    })
    .then((result) => {
        if (result.status === 200) {
            res.status(200).json({message: `Received GET request`, response: {token: result.data.access_token}});
        } else {
            res.status(201).json({message: `There was an issue`, response: {data: result.data}});
        }
    })
    .catch((err) => {
        console.log(err);
        console.log(err.response);
    });
    } catch(err) {
        console.log(err);
        res.status(400).json({message: `error`, error: err});
    }

});

router.post(`/kitty`, async (req, res) => {

    console.log(req.body);

    try {
        KittyModel.findOne({customerid: req.body.customerid}, (err, doc) => {
            if (err) {
                console.log(err);
                res.status(400).json({message: `error`, error: err});
            }

            if (doc) {
                UserAccountModel.updateOne({id: req.body.user}, {$push: {'data.groups': doc}}, (err, doc) => {
                    if (err) {
                        console.log(err);
                        res.status(400).json({message: `error`, error: err});
                    }
        
                    if (!doc) {
                        res.status(202).json({message: 'Could not find account', response: {}});
                    } else {
                        res.status(200).json({message: `Kitty saved to account`, response: doc});    
                    }
                });


            } else {
                res.status(201).json({message: `Error`, response: doc});
            }
        });
    } catch(err) {
        console.log(err);
        res.status(400).json({message: `error`, error: err});
    }
});

module.exports = router;