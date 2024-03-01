const express = require('express');
const router = express.Router();
const query = require('./database/sqlserver')

router.get('/', (req, res) => {
    res.render('login');
})

router.get('/createUser', (req, res) => {
    res.render('createUser');
})

router.get('/db', async (req, res) => {
    const result = await query.getUsers()
    console.log('Respuesta');
    console.log(result.recordset);
    console.log('fin de respuesta');
    res.send(result.recordset)
})

router.get('/recoveryPassword', (req, res) => {
    res.render('recoveryPassword');
})

router.post('/login', (req, res) => {




    
    res.render('dashboard');
})

router.get('/dashboard', (req, res) => {
    res.render('dashboard');
})

router.post('./validateUser', (req, res) => {
    //Hacemos cualquier validacion y si es correcto devolvemos el dashboard
    console.log('logueado')
    res.send('Logueado');
})

module.exports = router;