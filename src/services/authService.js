const User = require('../models/User');
const bcrypt = require('bcrypt');

exports.register = function (username, password, reapeatPassword) {
    return User.create({ username, password });
}

exports.login = function (username, password) {
    return User.findByUsername(username)
        .then(user => Promise.all([bcrypt.compare(password, user.password), user]))
        .then(([isValid,user])=>{
            if(isValid){
                return user
            }else{
                throw {message: 'Cannot find username or password'}
              
            }
        })
}