const express = require('express');
const router = express.Router();
const User = require('../schemas/userSchema');
const { authSchema } = require('../helpers/userValidation');
const { signAccessToken, verifyAccessToken, signRefreshToken, verifyRefreshToken } = require('../helpers/jwt_token');
const createHttpError = require('http-errors');


//get authentic user

router.get('/user', verifyAccessToken, async (req, res) => {
    try {
        await User.find({})
            .then((result) => {
                return res.send({ data: result, status: 200 })
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
        const user = await User.findOne({ email: validUser.email });

        if (!user) {
            res.send({ status: 204, message: 'User not fond' })
        }
        else {
            const isMatch = await user.isValidPassword(validUser.password);
            if (isMatch) {
                const token = await signAccessToken(user.id);
                const refresh_token = await signRefreshToken(user.id);
                res.send({ status: 200, message: 'success', user, token, refresh_token })
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

        const alreadyHave = await User.findOne({ email: validUser.email });
        if (alreadyHave) throw createHttpError.Conflict(`${validUser.email} is already exist`)

        const newUser = new User(validUser);
        await newUser.save()
            .then(async (result) => {
                const token = await signAccessToken(result.id);
                const refresh_token = await signRefreshToken(result.id);
                return res.send({ status: 200, token, refresh_token, message: 'Success', result })
            })
            .catch((error) => {
                return res.send({ status: 501, message: 'Unable to create new contact', error });

            });
    } catch (error) {
        res.send({ status: 500, message: 'Server error', error })
    }
});

//refresh_token

router.post('/refresh-token', async (req, res, next) => {
    try {
        const { refresh_token } = req.body;
        if (!refresh_token) throw createHttpError.BadRequest();
        const userId = await verifyRefreshToken(refresh_token)
        const token = await signAccessToken(userId);
        const refreshToken = await signRefreshToken(userId);
        res.send({ status: 200, message: 'success', token, refresh_token: refreshToken })
    } catch (error) {
        next(error)
    }
})

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