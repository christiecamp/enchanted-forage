const { User } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');

//resolvers - functions that actually execute the queries and mutations
const resolvers = {
    //query - get user data
    Query: {
        me: async (parent, args, context) => {
            if (context.user) {
                const userData = await User.findOne({ _id: context.user.id })
                .select('-__v -password')
                .populate('savedBooks');

                return userData;
            }
            throw new AuthenticationError('you are not logged in');
        }
    },
    Mutation: {
        //login
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });
            //check username credentials
            if (!user) {
                throw new AuthenticationError('username/password incorrect');
            }
            const correctPw = await user.isCorrectPassword(password);
            //check password credentials
            if (!correctPw) {
                throw new AuthenticationError('username/password incorrect');
            }
            //auth token
            const token = signToken(user);
            return { token, user };
        },
        //add user
        addUser: async (parent, { username, email, password }) => {






        },
        //saveBook
        //removeBook
    },
};

module.exports = resolvers;
