const JWT = require('jsonwebtoken');

module.exports = {
    signAccessToken: () => {
        return new Promise((resolve, reject) => {
            const payload = {
                name: 'partho bepary'
            };
            const secret = "Very secret token";
            const options = {
                // exp: Math.floor(Date.now() / 1000) + (60 * 60),
                expiresIn: "1h",
            };
            JWT.sign(payload, secret, options, (err, token) => {
                if (err) reject(err)
                resolve(token)
            })
        })
    }
}