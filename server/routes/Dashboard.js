const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const UserAccountModel = require('../models/UserAccountModel');
const KittyModel = require('../models/KittyModel');
const crypto = require('crypto');

router.post('/kitty/create', async (req, res) => {

    // const kittyDetails = {
    //     id: crypto.randomBytes(8).toString('hex'),
    //     creator: req.body.creator,
    //     name: req.body.name,
    //     type: req.body.type,
    //     description: req.body.description,
    //     optout: req.body.optout,
    //     amount: req.body.amount,
    //     paymentfrequency: req.body.paymentfrequency,
    //     users: [req.body.creator],
    //     customerid: req.body.customerid
    // }
    const kittyDetails = {
        id: crypto.randomBytes(8).toString('hex'),
        creator: req.body.creator,
        name: req.body.name,
        type: req.body.type,
        description: req.body.description,
        optout: req.body.optout,
        amount: req.body.amount,
        paymentfrequency: req.body.paymentfrequency,
        users: [req.body.creator],
        // customerid: req.body.customerid
    }

    const kitty = new KittyModel(kittyDetails);

    try {
        UserAccountModel.updateOne({id: req.body.creator}, {$push: {'data.groups': kittyDetails}}, (err, doc) => {
            if (err) {
                console.log(err);
                res.status(400).json({message: `error`, error: err});
            }

            if (!doc) {
                res.status(201).json({message: 'Could not find account', response: {}});
            } else {
                const createKitty = kitty.save();
                res.status(200).json({message: `New kitty created`, response: createKitty});    
            }
        });
    } catch(err) {
        console.log(err);
        res.status(400).json({message: `error`, error: err});
    }

});

module.exports = router;