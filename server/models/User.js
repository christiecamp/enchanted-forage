const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

//import schema from Book.js
const bookSchema = require('./Book');

//create user schema
const userSchema = new Schema(
    {
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true, //remove whitespace
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/.+\@.+\..+/, 'must use valid email address'] //regex for email
    },
    password: {
        type: String,
        required: true,
        // minlength: 8, //password must be at least 8 characters long
    },
    //associate user with saved books
    savedBooks: [bookSchema],
    },
    //set up virtual to count saved books
    {
        toJSON: {
            virtuals: true,
        },
    }
);

//pre-save middleware to create password
userSchema.pre('save', async function (next) {
    //if password is new or modified, hash it
    if (this.isNew || this.isModified('password')) {
        const saltRounds = 10;
        this.password = await bcrypt.hash(this.password, saltRounds); //hash password
    }

    next();
});

//compare incoming password with hashed password
userSchema.methods.isCorrectPassword = async function (password) {
    return bcrypt.compare(password, this.password);
};

//virtual to count saved books
userSchema.virtual('bookCount').get(function () {
    return this.savedBooks.length;
});

//create model
const User = model('User', userSchema);

module.exports = User;
