//import user model
const { User } = require('../models');
//import auth
const { signToken } = require('../utils/auth');

module.exports = {
    //get single user - id or username
    async getSingleUser({ user = null, params }, res) {
        const foundUser = await User.findOne({
            //if null - return params.id, else return user._id
            $or: [{ _id: user ? user._id : params.id }, { username: params.username }],
        });
        if (!foundUser) {
            return res.status(400).json({ message: 'user not found' });
        }
        res.json(foundUser);
    },

    //create user & token - send back to client
    async createUser({ body }, res) {
        const user = await User.create(body);
        if (!user) {
            return res.status(400).json({ message: 'user not found' });
        }
        //sign token
        const token = signToken(user);
        res.json({ token, user });
    },

    //login - check credentials & send back token to client
    async login({ body }, res) {
        const user = await User.findOne({ $or: [{ username: body.username }, { email: body.email }] });
        if (!user) {
            return res.status(400).json({ message: 'user not found' });
        }
        //check password
        const correctPw = await user.isCorrectPassword(body.password);
        if (!correctPw) {
            return res.status(400).json({ message: 'incorrect password' });
        }
        //sign token
        const token = signToken(user);
        res.json({ token, user });
    }


    //save book - add to user's `savedBooks` field
    //remove book - pull & remove from user's `savedBooks` field 

};