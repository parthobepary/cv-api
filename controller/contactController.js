const express = require('express');
const router = express.Router();
const Contact = require('../schemas/contactSchema');


// find all

router.get('/', async (req, res) => {
    try {
        await Contact.find({})
            .then((result) => {
                return res.send({
                    data: result,
                    status: 200
                })
            })
            .catch((err) => {
                return res.send('server error');
            })
    } catch (error) {
        res.send({ status: 500, message: 'Server error', error })
    }
});

// find one
router.get('/:id', async (req, res) => {
    try {
        await Contact.find({ _id: req.params.id })
            .then((result) => {
                return res.send({
                    data: result,
                    status: 200
                })
            })
            .catch((err) => {
                return res.send('server error');
            })
    } catch (error) {
        res.send({ status: 500, message: 'Server error', error })
    }
});

// create new contact
router.post('/', async (req, res) => {
    try {
        const newContact = new Contact(req.body);
        await newContact.save()
            .then((result) => {
                return res.send({ status: 200, message: 'Success', result })
            })
            .catch((error) => {
                return res.send({ status: 501, message: 'Unable to create new contact', error });

            });
    } catch (error) {
        res.send({ status: 500, message: 'Server error', error })
    }
});

// search api

router.post('/search', async (req, res) => {
    try {
        const search_text = req.query.search;
        const search_regex = new RegExp(search_text, 'i');

        await Contact.find({
            $or: [
                { first_name: search_regex },
                { last_name: search_regex },
                { email: search_regex },
            ]
        })
            .then((result) => {
                return res.send({ status: 200, message: 'Success', result })
            })
            .catch((error) => {
                return res.send({ status: 500, message: 'Data not fond', error })
            })
    } catch (error) {
        res.send({ status: 500, message: 'server error', error })
    }
})

// delete one
// update  one

module.exports = router;