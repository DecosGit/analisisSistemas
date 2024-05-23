const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

const userController = require('./controller/userData')
const empleoController = require('./controller/empleoController')
const usernameGlobal = require('./controller/userGlobal')

router.get('/', (req, res) => {

    res.render('login', { alertMessage: null });
})

router.post('/login', userController.findUser)

router.get('/createUser', (req, res) => {
    res.render('createUser', { alertMessage: null });
})

router.post('/createUser', userController.createUser)

router.get('/recoveryPassword', (req, res) => {
    res.render('recoveryPassword');
})

router.get('/adminUsuarios', userController.getUsuarios);

router.get('/createUserAdmin', (req, res) => {
    res.render('createUserAdmin');
})

router.get('/dashboard', (req, res) => {
    res.render('dashboard', { alertMessage: null, username: usernameGlobal.getUserGlobal() });
})    

router.get('/empleo', empleoController.findEmpleos)

router.get('/crearEmpleo', (req, res) => {
    res.render('crearEmpleo', { username: usernameGlobal.getUserGlobal() });
})

router.get('/editarEmpleo', (req, res) => {
    res.render('editarEmpleo', { username: usernameGlobal.getUserGlobal() });
})

router.post('/editarEmpleo', empleoController.editJob)

router.post('/opcionEliminarEmpleo', empleoController.deleteJob)

router.post('/createUserAdmin', userController.createUserAdmin)

router.post('/deleteUsuario/:id', userController.deleteUsuario)

router.get('/editarUsuario/:id', userController.getUsuario)

router.post('/editUsuario/:id', userController.editarUsuario)

router.post('/crearEmpleo', empleoController.createJob)

router.post('/opcionEditarEmpleo', empleoController.findEditJob)

router.post('/opcionAplicarEmpleo', (req, res) => {
    res.render('aplicarEmpleo', { username: usernameGlobal.getUserGlobal() });
})

router.get('/noticias', (req, res) => {
    res.render('noticias');
})

router.get('/keep_forward', (req, res) => {
    res.render('keep_forward');
})

// Configuración de multer para la carga de archivos
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'resources/FotoCv/'); // Asegúrate de que esta carpeta exista
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({ storage: storage });

// Ruta para manejar la carga de fotos
router.post('/uploadPhoto', upload.single('photo'), (req, res) => {
    if (req.file) {
        res.send('Foto subida exitosamente');
    } else {
        res.send('Error al subir la foto');
    }
});

module.exports = router;