const express = require('express');
const router = express.Router();
const Contact = require('../schemas/contactSchema');



router.get('/', async (req, res) => {
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
});

router.post('/', async (req, res) => {
    try {
        const newContact = new Contact(req.body);
        await newContact.save()
            .then(() => {
                return res.send({ status: 200, message: 'Success' })
            })
            .catch((error) => {
                return res.send({ status: 501, message: 'Unable to create new contact' });

            });
    } catch (error) {
        res.send({ status: 500, message: 'Server error' })
    }
})

module.exports = router;