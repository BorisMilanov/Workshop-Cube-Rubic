const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        validate: [/^[a-zA-Z0-9]+$/, 'Username should consist of english letters and digits'],
        unique: true,
        minLength: [5, 'Username cannot be with less then 2 characters']
    },
    password: {
        type: String,
        validate: [/^[a-zA-Z0-9]+$/, 'Password should consist of english letters and digits'],
        minLength: [8, 'Your password should be at least 6 characters'],
        required: true,
    }
});

userSchema.pre('save', function (next) {
    bcrypt.hash(this.password, 10)
        .then(hash => {
            this.password = hash;
            next();
        });
});

userSchema.static('findByUsername', function (username) {
    return this.findOne({ username })
});

userSchema.method('validatePassword', function (password) {
    return bcrypt.compare(password, this.password);
});

userSchema.virtual('resetPassword')
    .set(function (v) {
        if (v !== this.password) {
            throw new Error('Password missmatch');
        }
    });

const User = mongoose.model('User', userSchema);

module.exports = User;