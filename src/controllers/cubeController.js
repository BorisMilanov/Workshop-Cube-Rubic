const router = require('express').Router();
const validator = require('validator');

const cubeService = require('../services/cubeService');
const cubeAccessoryController = require('./cubeAccessoryController');
const { isAuth } = require('../middlewares/authMiddleware');
const { isOwnCube } = require('../middlewares/cubeAuthMiddleware');

const getCreateCubePage = (req, res) => {
    res.render('cube/create');
};

const createCube = async (req, res) => {
    let { name, description, imageUrl, difficulty } = req.body;

    try {
        await cubeService.create(name, description, imageUrl, difficulty, req.user._id);

        res.redirect('/');
    } catch (error) {
        let errors = Object.keys(error.errors).map(x => error.errors[x].message);

        console.log(errors);

        res.locals.errors = errors;

        res.render('cube/create')
    }
};

const cubeDetails = async (req, res) => {
    let cube = await cubeService.getOne(req.params.cubeId);
    let isOwn = cube.creator == req.user._id;

    res.render('cube/details', { ...cube, isOwn });
};

const getEditCubePage = async (req, res) => {
    res.render('cube/edit', req.cube);
};

const postEditCubePage = async (req, res) => {
    let { name, description, imageUrl, difficulty } = req.body;

    await cubeService.updateOne(req.params.cubeId, { name, description, imageUrl, difficulty })
    res.redirect(`/cube/${req.params.cubeId}`);
}

const getDeleteCubePage = async (req, res) => {
    res.render('cube/delete', req.cube);
};

const postDeleteCubePage = async (req, res) => {
    await cubeService.deleteOne(req.params.cubeId);
    res.redirect('/');
}
router.get('/create', isAuth, getCreateCubePage);
router.post('/create', isAuth, createCube);
router.get('/:cubeId', cubeDetails);
router.get('/:cubeId/edit', isAuth, isOwnCube, getEditCubePage);
router.post('/:cubeId/edit', isAuth, isOwnCube, postEditCubePage);
router.get('/:cubeId/delete', isAuth, getDeleteCubePage);
router.post('/:cubeId/delete', isAuth,  postDeleteCubePage);

router.use('/:cubeId/accessory', cubeAccessoryController);

module.exports = router;
