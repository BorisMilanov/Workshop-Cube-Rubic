const express = require('express');

const cubeController = require('./controllers/cubeController');
const homeController = require('./controllers/homeController');
const accessoryController = require('./controllers/accessoryController');
const router = express.Router();
let authController = require('./controllers/authController')

router.use(homeController);
router.use('/cube', cubeController);
router.use('/about', homeController);
router.use('/accessory', accessoryController);
router.use(authController)

router.use('*',(req, res)=>{
    res.status(404).render('404')
})
module.exports = router;
