const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const UserAccountModel = require('../models/UserAccountModel');
const crypto = require('crypto');

router.post('/login', async (req, res) => {
    try {
        UserAccountModel.findOne({email: req.body.email, password: req.body.password}, (err, doc) => {
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

module.exports = router;