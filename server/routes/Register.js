const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const UserAccountModel = require('../models/UserAccountModel');
const crypto = require('crypto');

router.post('/register', async (req, res) => {

    const modelDetails = {
        id: crypto.randomBytes(8).toString('hex'),
        email: req.body.email,
        password: req.body.password
    }

    const userAccount = new UserAccountModel(modelDetails);

    try {
        const addAccount = await userAccount.save();
        res.status(200).json({message: `New account created`, response: addAccount});
    } catch(err) {
        console.log(err);
        res.status(400).json({message: `error`, error: err});
    }

});

module.exports = router;