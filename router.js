const express = require('express');
const router = express.Router();
const query = require('./database/sqlserver')

const userController = require('./controller/userData')

router.post('/login', userController.findUser)
router.get('/', (req, res) => {
    res.render('login');
})

router.get('/createUser', (req, res) => {
    res.render('createUser');
})

router.post('/createUser', async (req, res) => {
    const result = await query.seekUser(req) 
})

router.get('/recoveryPassword', (req, res) => {
    res.render('recoveryPassword');
})


router.get('/dashboard', (req, res) => {
    res.render('dashboard');
})


module.exports = router;