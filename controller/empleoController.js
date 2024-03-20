// const { getConection } = require('../database/conexionSQLServer')
// const mssql = require('mssql');
const bd = require('../database/conexionSQL')

exports.findEmpleos = async (req, res) => {

    try {
        const conexion = bd()
        conexion.query('select * from empleos where estado = 1', (error, results) => {
            if (error) {
                console.error('Error al ejecutar la consulta:', error);
                res.status(500).json({ error: 'Error al ejecutar la consulta' });
                return;
            }
            if (results.length > 0) {
                // Si se encontraron datos, renderizar el dashboard con los datos del usuario
                return res.render('empleo', { data: results });
            } else {
                // Si no se encontraron datos, renderizar la página de login con un mensaje de error
                return res.render('empleo', { data: null, alertMessage: 'Usuario no encontrado' });
            }
        })
    } catch (error) {
        console.error(error)
        // Si hay un error, envía una alerta y permanece en la misma página
        res.render('login', { alertMessage: 'Error interno del servidor. Inténtalo de nuevo más tarde.' });
    }

}

exports.createJob = async (req, res) => {

    try {

        let puesto = req.body.puesto 
        let descripcion = req.body.descripcion
        let sueldo = req.body.sueldo
        let fecha = req.body.fecha
        let today = Date.now
        // Construir la consulta de inserción
        const insercion = 'INSERT INTO empleos (id, fecha_creacion, fecha_vencimiento, fecha_modificacion, estado,' +
            ' nombre, descripcion, sueldo) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
        const valores = [null, today, fecha, today, 1, puesto, descripcion, sueldo]; // Reemplaza valor1, valor2, valor3 con los valores que deseas insertar
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
                conexion.query('select * from empleos where estado = 1', (error, results) => {
                    if (error) {
                        console.error('Error al ejecutar la consulta:', error);
                        res.status(500).json({ error: 'Error al ejecutar la consulta' });
                        return;
                    }
                    if (results.length > 0) {
                        // Si se encontraron datos, renderizar el dashboard con los datos del usuario
                        return res.render('empleo', { data: results });
                    } else {
                        // Si no se encontraron datos, renderizar la página de login con un mensaje de error
                        return res.render('empleo', { data: null, alertMessage: 'Usuario no encontrado' });
                    }
                })
                // return res.render('empleo', { alertMessage: 'Creacion de empleo Exitoso ' + cui})
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
