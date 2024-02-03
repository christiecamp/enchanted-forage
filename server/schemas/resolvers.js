const { User } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');

//resolvers - functions that actually execute the queries and mutations
const resolvers = {
    //query - get user data
    Query: {
        me: async (_, args, context) => {
            if (context.user) {
                const userData = await User.findOne({ _id: context.user._id })
                .select('-__v -password')
                .populate('savedBooks');
                return userData;
            }
            throw new Error('not logged in');
        }
    },

    //mutation - hook that handles server-side mutations to create/update/delete data or perform server-side-effects 
    Mutation: {
        //login
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });
            //check username credentials
            if (!user) {
                throw AuthenticationError;
            }
            const correctPw = await user.isCorrectPassword(password);
            //check password credentials
            if (!correctPw) {
                throw AuthenticationError;
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
        saveBook: async (_, { input }, context) => {
            try {
                if (!context.user) {
                    throw new Error('not logged in');
                }
                const updatedUser = await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $addToSet: { savedBooks: input } },
                    { new: true, runValidators: true }
                );
                return updatedUser;
            } catch (err) {
                console.log(err);
                throw new Error(err);
            }
        },
        
        //removeBook
        //removeBook(bookId: ID!): User
        removeBook: async (_, { bookId }, context) => {
            const updatedUser = await User.findOneAndUpdate(
                { _id: context.user._id },
                { $pull: { savedBooks: { bookId } } },
                { new: true }
            );
            if (!updatedUser) {
                throw new Error('could not find user with this id');
            }
            return updatedUser;
        }
    },
};


module.exports = resolvers;
