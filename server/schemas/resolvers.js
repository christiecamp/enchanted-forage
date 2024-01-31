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

    //mutation - hook that handles server-side mutations to create/update/delete data or perform server-side-effects 
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

        //create user
        //addUser(username: String!, email: String!, password: String!): Auth
        addUser: async (parent, { username, email, password }) => {
            const user = await User.create({ username, email, password });
            const token = signToken(user);
            return { token, user };
        },

        //update user - save book
        //saveBook(input: BookInput): User
        saveBook: async (parent, { input }, context) => {
            if (context.user) {
                const updatedUser = await User.findByIdAndUpdate(
                    { _id: context.user._id },
                    { $push: { savedBooks: input } },
                    { new: true }
                );
                return updatedUser;
            }
            throw new AuthenticationError('you are not logged in');
        },
        
        //removeBook
        //removeBook(bookId: ID!): User
        removeBook: async (parent, { bookId }, context) => {
            if (context.user) {
                const updatedUser = await User.findByIdAndUpdate(
                    { _id: context.user._id },
                    { $pull: { savedBooks: { bookId } } },
                    { new: true }
                );
                return updatedUser;
            }
            throw new AuthenticationError('you are not logged in');
        },
    },
};

module.exports = resolvers;
