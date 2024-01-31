require('dotenv').config();
const jwt = require('jsonwebtoken');

//set token secret
const secret = process.env.SECRET;
const expiration = '2h';

module.exports = {
    //authenticated routes
    authMiddleware: function({ req }) {
        //token sent to req.query or header
        let token = req.query.token || req.headers.authorization;
        //separate "Bearer" from "<tokenvalue>"
        if (req.headers.authorization) {
            token = token.split(' ').pop().trim();
        }
        //return req with no token
        if (!token) {
            return req;
        }
        //verify token & add user data to req
        try {
            const { data } = jwt.verify(token, secret, { maxAge: expiration });
            req.user = data;
        } catch {
            console.log('invalid token');
        }
        return req;
    },

    //create token
    signToken: function({ username, email, _id }) { 
        //object with user data to provide token
        const payload = { username, email, _id };
        //sign method takes user object & creates token
        return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
    },
};