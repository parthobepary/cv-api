const createHttpError = require('http-errors');
const JWT = require('jsonwebtoken');
const redisClient = require('./init_redis')

module.exports = {
    signAccessToken: (userId) => {
        return new Promise((resolve, reject) => {
            const payload = {
                name: 'partho bepary'
            };
            const secret = process.env.ACCESS_TOKEN;
            const options = {
                // exp: Math.floor(Date.now() / 1000) + (60 * 60),
                expiresIn: "1h",
            };
            JWT.sign(payload, secret, options, (err, token) => {
                if (err) reject(createHttpError.InternalServerError())
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
    },
    signRefreshToken: (userId) => {
        return new Promise((resolve, reject) => {
            const payload = {};
            const secret = process.env.REFRESH_TOKEN;
            const options = {
                expiresIn: "2y",
                issuer: 'partho bepary',
                audience: userId
            };
            JWT.sign(payload, secret, options, (err, token) => {
                if (err) {
                    console.log(err.message);
                    reject(createHttpError.InternalServerError())
                }
                redisClient.SET(userId, token, 'EX', 36 * 24 * 24 * 60)
                    .then((result) => {
                        resolve(token)
                    })
                    .catch((err) => {
                        console.log(err);
                        reject(createHttpError.InternalServerError());
                        return
                    })
            })
        })
    },

    verifyRefreshToken: (refreshToken) => {
        return new Promise((resolve, reject) => {
            JWT.verify(refreshToken, process.env.REFRESH_TOKEN, (err, payload) => {
                if (err) reject(createHttpError.Unauthorized())
                const userId = payload.aud;
                redisClient.GET(userId)
                    .then((result) => {
                        if (refreshToken == result) return resolve(token);
                        reject(createHttpError.InternalServerError())
                    })
                    .catch((err) => {
                        console.log(err.message);
                        reject(createHttpError.InternalServerError());
                        return
                    })
            })
        })
    },
}