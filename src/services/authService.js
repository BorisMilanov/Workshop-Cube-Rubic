const bcrypt = require('bcrypt');
const User = require('../models/User');

exports.register = function (username, password, reapeatPassword) {
    return bcrypt.hash(password, 10).then(hash => User.create({ username, password: hash }))
}