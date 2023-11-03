const createHttpError = require('http-errors');
const JWT = require('jsonwebtoken');

module.exports = {
    signAccessToken: () => {
        return new Promise((resolve, reject) => {
            const payload = {
                name: 'partho bepary'
            };
            const secret = process.env.ACCESS_TOKEN;
            const options = {
                // exp: Math.floor(Date.now() / 1000) + (60 * 60),
                expiresIn: "20s",
            };
            JWT.sign(payload, secret, options, (err, token) => {
                if (err) reject(err)
                resolve(token)
            })
        })
    },
    verifyAccessToken: (req, res, next) => {
        if (!req.headers['authorization']) return next(createHttpError.Unauthorized())
        const authHeader = req.headers['authorization'];
        const token = authHeader.split(' ')[1]
        JWT.verify(token, process.env.ACCESS_TOKEN, (err, payload) => {
            if (err) {
                return next(createHttpError.Unauthorized());
            }
            req.payload = payload;
            next();
        })
    }
}