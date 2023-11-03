const express = require('express');
const router = express.Router();
const User = require('../schemas/userSchema');
const { authSchema } = require('../helpers/userValidation');
const { signAccessToken, verifyAccessToken } = require('../helpers/jwt_token')


//get authentic user

router.get('/user', verifyAccessToken, async (req, res) => {
    try {
        await User.find({})
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
})

// login

router.post('/login', async (req, res) => {
    try {
        const validUser = await authSchema.validateAsync(req.body);
        const token = await signAccessToken();

        const user = await User.findOne({ email: validUser.email });

        if (!user) {
            res.send({ status: 204, message: 'User not fond' })
        }
        else {
            const isMatch = await user.isValidPassword(validUser.password);
            if (isMatch) {
                res.send({ status: 200, message: 'success', user, token })
            } else {
                res.send({ status: 400, message: 'Password did not matched' })
            }
        }
    } catch (error) {
        res.send({ status: 500, message: 'Server error', error })
    }
});


// register new contact
router.post('/register', async (req, res) => {
    try {
        const validUser = await authSchema.validateAsync(req.body);
        const token = await signAccessToken();

        const alreadyHave = await User.findOne({ email: validUser.email });
        if (alreadyHave) {
            res.send({ status: 202, message: `${validUser.email} is already exist` });
        }
        else {
            const newUser = new User(validUser);
            await newUser.save()
                .then((result) => {
                    return res.send({ status: 200, token, message: 'Success', result })
                })
                .catch((error) => {
                    return res.send({ status: 501, message: 'Unable to create new contact', error });

                });
        }
    } catch (error) {
        res.send({ status: 500, message: 'Server error', error })
    }
});

// search user

router.post('/search', async (req, res) => {
    try {

    } catch (error) {
        res.send({ status: 500, message: 'server error', error })
    }
})

// update user
router.put('/:id', async (req, res) => {
    try {
        await User.findByIdAndUpdate({ _id: req.params.id }, req.body, { new: true })
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


module.exports = router;


// https://www.youtube.com/watch?v=BnN3TQOG5-g