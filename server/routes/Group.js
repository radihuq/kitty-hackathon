const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const UserAccountModel = require('../models/UserAccountModel');
const KittyModel = require('../models/KittyModel');
const crypto = require('crypto');

router.post('/contribute', async (req, res) => {

    const transactionDetails = {
        user: req.body.userid,
        amount: req.body.amount,
        type: req.body.type
    }

    try {
        KittyModel.updateOne({customerid: req.body.customerid}, {$push: {'data.transactions': transactionDetails}}, (err, doc) => {
            if (err) {
                console.log(err);
                res.status(400).json({message: `error`, error: err});
            }

            if (!doc) {
                res.status(201).json({message: 'Could not find group', response: {}});
            } else {
                res.status(200).json({message: `New transaction added`, response: doc});    
            }
        });
    } catch(err) {
        console.log(err);
        res.status(400).json({message: `error`, error: err});
    }

});

module.exports = router;