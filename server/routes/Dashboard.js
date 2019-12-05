const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const UserAccountModel = require('../models/UserAccountModel');
const KittyModel = require('../models/KittyModel');
const crypto = require('crypto');
const axios = require('axios');


router.post('/kitty/create', async (req, res) => {

    // console.log(req.headers.authorization);
    // const Authorization = req.headers.authorization;

    let kittyDetails = {
        id: crypto.randomBytes(8).toString('hex'),
        creator: req.body.creator,
        name: req.body.name,
        type: req.body.type,
        description: req.body.description,
        optout: req.body.optout,
        amount: req.body.amount,
        paymentfrequency: req.body.paymentfrequency,
        users: [req.body.creator],
        //remove customerid after hooking up API
        // customerid: crypto.randomBytes(3).toString('hex')
    }

    try {
        const bankInfo = {
            branchCode: "00000001",
            countryOfResidency: "IN",
            addresses: [
                {
                    addressType: "RESIDENTIAL",
                    buildingNumber: "122",
                    country: "IN",
                    line1: "Starbucks Branch",
                    line2: "201 Powell Street",
                    line3: "Kengeri",
                    line4: "San Francisco",
                    line5: "CA",
                    postalCode: "94102"
                }
            ],
            dateOfBirth: "1979-05-01",
            emailAddresses: [
                {
                    address: "OfficeAdmin@OfficeAddress.com",
                    type: "HOME"
                }
            ],
            firstName: "EMANUEL",
            gender: "MALE",
            identification: {
                id: "WWW12",
                type: "TXID"
            },
            kycCheckRequired: "REQUIRED",
            lastName: "SHOWN",
            phoneNumbers: [
                {
                    number: "0044 01753 573244",
                    type: "MOBILE"
                }
            ],
            title: 'Doctor'
        }

        // const bankInfo = {
        //     countryOfResidency: "US",
        //     firstName: "John"
        // }

        createBankAccount(bankInfo);

        function createBankAccount (bankInfo) {

            axios.request({
                url: "/login/v1/sandbox/oidc/token",
                method: "post",
                baseURL: "https://api.fusionfabric.cloud/",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                auth: {
                    username: "591a7fb5-cf1b-4e3c-bb59-572989f69df2",
                    password: "453e0106-0ce6-4b95-afe5-55d9db813bbe",
                },
                data: 
                    "grant_type=client_credentials&username=591a7fb5-cf1b-4e3c-bb59-572989f69df2&password=453e0106-0ce6-4b95-afe5-55d9db813bbe"
            
            })
            .then((result) => {
                if (result.status === 200) {
                    // res.status(200).json({message: `Received GET request`, response: {token: result.data.access_token}});
                    // console.log(result);
                    const Authorization = result.data.access_token;
                    // console.log(Authorization);

                    const headers = {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${Authorization}`
                    }
        
                    axios.post(`https://api.fusionfabric.cloud/retail-banking/customers/v1/personal-customers`, bankInfo, {headers: headers})
                    .then((result) => {
                        // console.log(result);
                        // console.log(result.data);
                        console.log(result.status);
                        console.log(result.data.customerId);

                        if (result.status === 201) {
                            createKitty(result.data.customerId);
                        }
                    })
                    .catch((err) => {
                        console.log(err);
                        // console.log(err.response.data);
                        
                    })
                
                } else {
                    res.status(201).json({message: `There was an issue`, response: {data: result.data}});
                }
            })
            .catch((err) => {
                console.log(err);
                console.log(err.response);
            });
        }

        function createKitty(customerid) {
            kittyDetails.customerid = customerid;
            const kitty = new KittyModel(kittyDetails);
            console.log(kittyDetails);

            UserAccountModel.updateOne({id: req.body.creator}, {$push: {'data.groups': kittyDetails}}, (err, doc) => {
                if (err) {
                    console.log(err);
                    res.status(400).json({message: `error`, error: err});
                }
    
                if (!doc) {
                    res.status(201).json({message: 'Could not find account', response: {}});
                } else {
                    kitty.save();
                    res.status(200).json({message: `New kitty created`, response: kittyDetails});    
                }
            });
        }

        // UserAccountModel.updateOne({id: req.body.creator}, {$push: {'data.groups': kittyDetails}}, (err, doc) => {
        //     if (err) {
        //         console.log(err);
        //         res.status(400).json({message: `error`, error: err});
        //     }

        //     if (!doc) {
        //         res.status(201).json({message: 'Could not find account', response: {}});
        //     } else {
        //         kitty.save();
        //         res.status(200).json({message: `New kitty created`, response: kittyDetails});    
        //     }
        // });

    } catch(err) {
        console.log(err);
        res.status(400).json({message: `error`, error: err});
    }

});

module.exports = router;