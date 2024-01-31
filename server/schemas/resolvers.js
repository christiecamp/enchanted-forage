const { User } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');

//resolvers - functions that actually execute the queries and mutations
const resolvers = {
//query
    //me
//mutations
    //login
    //addUser
    //saveBook
    //removeBook
};

module.exports = resolvers;
