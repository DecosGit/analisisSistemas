const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

const userController = require('./controller/userData')
const empleoController = require('./controller/empleoController')
const usernameGlobal = require('./controller/userGlobal')
const solicitudController = require('./controller/solicitudController')

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
    let idEmpleo = req.body.datosEdit
    let nombreEmpleo = req.body.datosEditNombre
    res.render('aplicarEmpleo', { username: usernameGlobal.getUserGlobal(), idEmpleo: idEmpleo, nombreEmpleo: nombreEmpleo });
})

router.get('/noticias', (req, res) => {
    res.render('noticias');
})

router.get('/keep_forward', (req, res) => {
    res.render('keep_forward');
})

// Configuración de multer para la carga de fotos
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'resources/FotoCv/'); // Asegúrate de que esta carpeta exista
    },
    filename: (req, file, cb) => {
        const dpi = req.body.cui; // Obtener el DPI del cuerpo de la solicitud
        cb(null, `${dpi}.jpg`); // Renombrar el archivo con el DPI
    }
});

const upload = multer({ storage: storage });

// Ruta para manejar la carga de fotos CV
router.post('/uploadPhoto', upload.single('photo'), (req, res) => {
    if (req.file) {
        res.send('Foto subida exitosamente');
    } else {
        res.send('Error al subir la foto');
    }
});

// Configuración de multer para la carga de antecedentes penales
const storageAntecedentesPenales = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'resources/AntecedentesPenales/'); // Asegúrate de que esta carpeta exista
    },
    filename: (req, file, cb) => {
        const dpi = req.body.cui; // Obtener el DPI del cuerpo de la solicitud
        cb(null, `${dpi}.pdf`); // Renombrar el archivo con el DPI
    }
});

const uploadAntecedentesPen = multer({ storage: storageAntecedentesPenales });

// Ruta para manejar la carga de antecedentes penales
router.post('/uploadAntecedentesPenales', uploadAntecedentesPen.single('documentAntecedentesPenales'), (req, res) => {
    if (req.file) {
        res.send('Documento subido exitosamente');
    } else {
        res.send('Error al subir el documento');
    }
});

// Configuración de multer para la carga de antecedentes policiacos
const storageAntecedentesPoliciacos = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'resources/AntecedentesPoliciacos/'); // Asegúrate de que esta carpeta exista
    },
    filename: (req, file, cb) => {
        const dpi = req.body.cui; // Obtener el DPI del cuerpo de la solicitud
        cb(null, `${dpi}.pdf`); // Renombrar el archivo con el DPI
    }
});

const uploadAntecedentesPol = multer({ storage: storageAntecedentesPoliciacos });

// Ruta para manejar la carga de antecedentes policiacos
router.post('/uploadAntecedentesPoliciacos', uploadAntecedentesPol.single('documentAntecedentesPoliciacos'), (req, res) => {
    if (req.file) {
        res.send('Documento subido exitosamente');
    } else {
        res.send('Error al subir el documento');
    }
});

// Configuración de multer para la carga de auténticas
const storageAutentica = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'resources/Autentica/'); // Asegúrate de que esta carpeta exista
    },
    filename: (req, file, cb) => {
        const dpi = req.body.cui; // Obtener el DPI del cuerpo de la solicitud
        cb(null, `${dpi}.pdf`); // Renombrar el archivo con el DPI
    }
});

const uploadAutentica = multer({ storage: storageAutentica });

// Ruta para manejar la carga de auténticas
router.post('/uploadAutentica', uploadAutentica.single('documentAutentica'), (req, res) => {
    if (req.file) {
        res.send('Documento subido exitosamente');
    } else {
        res.send('Error al subir el documento');
    }
});

// Configuración de multer para la carga de declaración jurada
const storageDeclaracionJurada = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'resources/DeclaracionJurada/'); // Asegúrate de que esta carpeta exista
    },
    filename: (req, file, cb) => {
        const dpi = req.body.cui; // Obtener el DPI del cuerpo de la solicitud
        cb(null, `${dpi}.pdf`); // Renombrar el archivo con el DPI
    }
});

const uploadDeclaracionJurada = multer({ storage: storageDeclaracionJurada });

// Ruta para manejar la carga de declaración jurada
router.post('/uploadDeclaracionJurada', uploadDeclaracionJurada.single('documentDeclaracionJurada'), (req, res) => {
    if (req.file) {
        res.send('Documento subido exitosamente');
    } else {
        res.send('Error al subir el documento');
    }
});

// Configuración de multer para la carga de dpi
const storageDpi = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'resources/Dpi/'); // Asegúrate de que esta carpeta exista
    },
    filename: (req, file, cb) => {
        const dpi = req.body.cui; // Obtener el DPI del cuerpo de la solicitud
        cb(null, `${dpi}.pdf`); // Renombrar el archivo con el DPI
    }
});

const uploadDpi = multer({ storage: storageDpi });

// Ruta para manejar la carga de dpi
router.post('/uploadDpi', uploadDpi.single('documentDpi'), (req, res) => {
    if (req.file) {
        res.send('Documento subido exitosamente');
    } else {
        res.send('Error al subir el documento');
    }
});

// Configuración de multer para la carga de otros
const storageOtros = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'resources/Otros/'); // Asegúrate de que esta carpeta exista
    },
    filename: (req, file, cb) => {
        const dpi = req.body.cui; // Obtener el DPI del cuerpo de la solicitud
        cb(null, `${dpi}.pdf`); // Renombrar el archivo con el DPI
    }
});

const uploadOtros = multer({ storage: storageOtros });

// Ruta para manejar la carga de otros
router.post('/uploadOtros', uploadOtros.single('documentOtros'), (req, res) => {
    if (req.file) {
        res.send('Documento subido exitosamente');
    } else {
        res.send('Error al subir el documento');
    }
});

// Configuración de multer para la carga de renas
const storageRenas = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'resources/Renas/'); // Asegúrate de que esta carpeta exista
    },
    filename: (req, file, cb) => {
        const dpi = req.body.cui; // Obtener el DPI del cuerpo de la solicitud
        cb(null, `${dpi}.pdf`); // Renombrar el archivo con el DPI
    }
});

const uploadRenas = multer({ storage: storageRenas });

// Ruta para manejar la carga de renas
router.post('/uploadRenas', uploadRenas.single('documentRenas'), (req, res) => {
    if (req.file) {
        res.send('Documento subido exitosamente');
    } else {
        res.send('Error al subir el documento');
    }
});

// Configuración de multer para la carga de rtu
const storageRtu = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'resources/Rtu/'); // Asegúrate de que esta carpeta exista
    },
    filename: (req, file, cb) => {
        const dpi = req.body.cui; // Obtener el DPI del cuerpo de la solicitud
        cb(null, `${dpi}.pdf`); // Renombrar el archivo con el DPI
    }
});

const uploadRtu = multer({ storage: storageRtu });

// Ruta para manejar la carga de rtu
router.post('/uploadRtu', uploadRtu.single('documentRtu'), (req, res) => {
    if (req.file) {
        res.send('Documento subido exitosamente');
    } else {
        res.send('Error al subir el documento');
    }
});

router.post('/crearSolicitud', solicitudController.crearSolicitud)

module.exports = router;