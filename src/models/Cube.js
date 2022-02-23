const mongoose = require('mongoose');

const cubeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        validate: [/^[a-zA-Z0-9 ]+$/, 'Cube name should consist of english letters, digits and spaces'],
    },
    description: {
        type: String,
        required: true,
        maxlength: 100,
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
        type: String,
        ref: 'User',
    }

})

const Cube = mongoose.model('Cube', cubeSchema);

module.exports = Cube;