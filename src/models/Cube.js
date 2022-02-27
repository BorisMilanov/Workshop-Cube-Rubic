const mongoose = require('mongoose');

const cubeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        validate: [/^[a-zA-Z0-9 ]+$/, 'Username should consist of english letters, digits and spaces'],
    },
    description: {
        type: String,
        required: true,
        maxlength: 100,
        minlength: 2,
    },
    imageUrl: {
        type: String,
        required: true,
        validate: [/^https?:\/\//i, 'invalid image url']

    },
    difficulty: {
        type: Number,
        required: true,
        min: 1,
        max: 5,
    },
    accessories: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'Accessory',
        }
    ],
    creator: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
    }
});


cubeSchema.statics.findByName = function (name) {
    return this.find({ name });
};

const Cube = mongoose.model('Cube', cubeSchema);

module.exports = Cube;