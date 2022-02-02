const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minLength: 3
    },
    password: {
        type: String,
        minLength: [6, 'Your password should be at least 6 characters'],
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

userSchema.static('findByUsername', function(username){
    return this.findOne({username})
})

const User = mongoose.model('User', userSchema);

module.exports = User;