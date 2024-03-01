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

router.post('/createUser', async (req, res) => {
    // Extraer los valores del cuerpo de la solicitud
    const { cui, contrasenia } = req.body;

        // Llamar a la función registrarUsuario() para realizar el registro del usuario
        await registrarUsuario();

    // Llamada a la función registrarUsuario()
    async function registrarUsuario() {
        try {
            // Ejecutar el procedimiento almacenado
            const pool = await query.getConection(); // Obtener la conexión a la base de datos
            const request = pool.request();

            const result = await request
                .input('id_usuario', mssql.NVarChar(50), cui)
                .input('password', mssql.NVarChar(25), contrasenia)
                .input('estado', mssql.TinyInt, 1)
                .input('accion', mssql.Char(1), 'I')
                .execute('sp_acciones_usuario');

            // Mostrar mensaje de éxito
            Swal.fire({
                icon: 'success',
                title: 'Éxito',
                text: 'Usuario registrado correctamente',
            });

            // Limpiar formulario
            res.redirect('/dashboard');

        } catch (error) {
            console.error(error);
            // Mostrar mensaje de error
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Ha ocurrido un error al registrar el usuario',
            });
        }
    }
});

module.exports = router;