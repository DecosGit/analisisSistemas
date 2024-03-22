// const { getConection } = require('../database/conexionSQLServer')
const bd = require('../database/conexionSQL')

exports.findUser = (req, res) => {

    try {
        let username = req.body.username
        let password = req.body.password
        console.log(username + ' ' + password);
        const conexion = bd();
        conexion.query('SELECT * FROM usuarios WHERE estado = 1 AND dpi = ? AND contrasena = ?', [username, password], (error, results) => {
            if (error) {
                console.error('Error al ejecutar la consulta:', error);
                return res.render('login', { alertMessage: 'Error al ejecutar la consulta' });
            }

            if (results.length > 0) {
                // Si se encontraron datos, renderizar el dashboard con los datos del usuario
                return res.render('dashboard', { data: results, username: username, alertMessage: 'Bienvenido ' + username });
            } else {
                // Si no se encontraron datos, renderizar la página de login con un mensaje de error
                return res.render('login', { alertMessage: 'Usuario no encontrado' });
            }
        });
    } catch (error) {
        console.error(error)
        // Si hay un error, envía una alerta y permanece en la misma página
        res.render('login', { alertMessage: 'Error interno del servidor. Inténtalo de nuevo más tarde.' });
    }

}

exports.createUser = (req, res) => {
    try {

        let nombres = req.body.primerNombre + ' ' + req.body.segundoNombre + ' ' + req.body.tercerNombre
        let apellidos = req.body.primerApellido + ' ' + req.body.segundoApellido + ' ' + req.body.apellidoCasada
        let cui = req.body.cui
        let correo = req.body.correo
        let password1 = req.body.contrasenia
        let password2 = req.body.confirmacionContrasenia
        let fecha = Date.now()
        let estado = '1'
        let rol = 'Basic'

        if(password1 != password2){
            throw new Error('La Password no coincide');
        }

        // Construir la consulta de inserción
        const insercion = 'INSERT INTO usuarios (id, nombre, apellido, dpi, correo_electronico, contrasena, fecha_creacion, estado, rol) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
        const valores = [null, nombres, apellidos, cui, correo, password1, fecha, estado, rol]; // Reemplaza valor1, valor2, valor3 con los valores que deseas insertar
        const conexion = bd();
        conexion.query(insercion, valores, (error, results) => {
            if (error) {
                console.error('Error al insertar en la base de datos:', error);
                return res.status(500).json({ error: 'Error al insertar en la base de datos' });
            }
        
            // Verificar si se insertó correctamente
            if (results.affectedRows > 0) {
                // Si se insertó al menos una fila, significa que se insertó correctamente
                console.log('Inserción exitosa');
                return res.render('login', { alertMessage: 'Creacion de usuario Exitoso ' + cui})
            } else {
                // Si no se insertó ninguna fila, significa que no se pudo insertar
                console.log('No se pudo insertar');
                return res.render('createUser', { alertMessage: 'No se pudo crear usuario'})
            }
        });
    } catch (error) {
        console.error(error)
        // Si hay un error, envía una alerta y permanece en la misma página
        res.render('login', { alertMessage: 'Error interno del servidor. Inténtalo de nuevo más tarde.' });
    }
}

exports.createUserAdmin = (req, res) => {
    try {

        let nombres = req.body.primerNombre + ' ' + req.body.segundoNombre + ' ' + req.body.tercerNombre
        let apellidos = req.body.primerApellido + ' ' + req.body.segundoApellido + ' ' + req.body.apellidoCasada
        let cui = req.body.cui
        let correo = req.body.correo
        let password1 = req.body.contrasenia
        let password2 = req.body.confirmacionContrasenia
        let fecha = Date.now()
        let estado = '1'
        let rol = req.body.rol

        if(password1 != password2){
            throw new Error('La Password no coincide');
        }

        // Construir la consulta de inserción
        const insercion = 'INSERT INTO usuarios (id, nombre, apellido, dpi, correo_electronico, contrasena, fecha_creacion, estado, rol) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
        const valores = [null, nombres, apellidos, cui, correo, password1, fecha, estado, rol]; // Reemplaza valor1, valor2, valor3 con los valores que deseas insertar
        const conexion = bd();
        conexion.query(insercion, valores, (error, results) => {
            if (error) {
                console.error('Error al insertar en la base de datos:', error);
                return res.status(500).json({ error: 'Error al insertar en la base de datos' });
            }
        
            // Verificar si se insertó correctamente
            if (results.affectedRows > 0) {
                // Si se insertó al menos una fila, significa que se insertó correctamente
                console.log('Inserción exitosa');
                return res.render('adminUsuarios', { alertMessage: 'Creacion de usuario Exitoso ' + cui})
            } else {
                // Si no se insertó ninguna fila, significa que no se pudo insertar
                console.log('No se pudo insertar');
                return res.render('createUserAdmin', { alertMessage: 'No se pudo crear usuario'})
            }
        });
    } catch (error) {
        console.error(error)
        // Si hay un error, envía una alerta y permanece en la misma página
        res.render('login', { alertMessage: 'Error interno del servidor. Inténtalo de nuevo más tarde.' });
    }
}

