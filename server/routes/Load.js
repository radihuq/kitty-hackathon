const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const UserAccountModel = require('../models/UserAccountModel');
const KittyModel = require('../models/KittyModel');
const crypto = require('crypto');

router.post('/user', async (req, res) => {
    try {
        UserAccountModel.findOne({id: req.body.id}, (err, doc) => {
            if (err) {
                console.log(err);
                res.status(400).json({message: `error`, error: err});
            }

            if (doc) {
                res.status(200).json({message: `Account found`, response: doc});
            } else {
                res.status(201).json({message: `Account not found/bad combination`, response: doc});
            }
        });
        
    } catch(err) {
        console.log(err);
        res.status(400).json({message: `error`, error: err});
    }

});

router.post('/kitty', async (req, res) => {
    try {
        KittyModel.findOne({customerid: req.body.customerid}, (err, doc) => {
            if (err) {
                console.log(err);
                res.status(400).json({message: `error`, error: err});
            }

            if (doc) {
                res.status(200).json({message: `Group found`, response: doc});
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