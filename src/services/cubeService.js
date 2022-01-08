const Cube = require('../models/Cube');

const cubeDb = [];

const getAll = () => cubeDb.slice();
const create = (name, description, imageUrl, difficulty) => {
    let cube = new Cube(name, description, imageUrl, difficulty);

    cubeDb.push(cube)
};

const cubeService = {
    getAll,
    create,
}

module.exports = cubeService;