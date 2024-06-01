// const { getConection } = require('../database/conexionSQLServer')
// const mssql = require('mssql');
const bd = require('../database/conexionSQL')
const usernameGlobal = require('./userGlobal')
const bkAppliances = require('./bkAplicantes')

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
                const userData = usernameGlobal.getUserGlobal();
                return res.render('empleo', { data: results, username: userData });
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
                        const userData = usernameGlobal.getUserGlobal();
                        return res.render('empleo', { data: results, username: userData });
                    } else {
                        // Si no se encontraron datos, renderizar la página de login con un mensaje de error
                        return res.render('empleo', { data: null, username: userData, alertMessage: 'Usuario no encontrado' });
                    }
                })
                // return res.render('empleo', { alertMessage: 'Creacion de empleo Exitoso ' + cui})
            } else {
                // Si no se insertó ninguna fila, significa que no se pudo insertar
                console.log('No se pudo insertar');
                return res.render('createUser', { alertMessage: 'No se pudo crear usuario' })
            }
        });
    } catch (error) {
        console.error(error)
        // Si hay un error, envía una alerta y permanece en la misma página
        res.render('login', { alertMessage: 'Error interno del servidor. Inténtalo de nuevo más tarde.' });
    }

}

exports.findEditJob = async (req, res) => {
    try {
        const userData = usernameGlobal.getUserGlobal();

        let idEmpleo = req.body.datosEdit

        const conexion = bd()
        conexion.query('select * from empleos where estado = 1 AND id = ?',
            [idEmpleo], (error, results) => {
                if (error) {
                    console.error('Error al ejecutar la consulta:', error);
                    res.status(500).json({ error: 'Error al ejecutar la consulta' });
                    return;
                }
                if (results.length > 0) {
                    // Si se encontraron datos, renderizar el dashboard con los datos del usuario
                    return res.render('editarEmpleo', { data: results, username: userData });
                } else {
                    // Si no se encontraron datos, renderizar la página de login con un mensaje de error
                    return res.render('empleo', { data: null, alertMessage: 'Empleo no encontrado' });
                }
            })

    } catch (error) {
        console.error(error)
        // Si hay un error, envía una alerta y permanece en la misma página
        res.render('empleo', { alertMessage: 'Error interno del servidor. Inténtalo de nuevo más tarde.' });
    }
}

exports.editJob = async (req, res) => {
    try {
        const userData = usernameGlobal.getUserGlobal();

        let idEmpleo = req.body.datos
        let puesto = req.body.puesto
        let descripcion = req.body.descripcion
        let sueldo = req.body.sueldo
        let fecha = req.body.fecha
        let today = new Date(Date.now())
        // Formatear la fecha
        let year = today.getFullYear();
        let month = String(today.getMonth() + 1).padStart(2, '0');
        let day = String(today.getDate()).padStart(2, '0');
        let hours = String(today.getHours()).padStart(2, '0');
        let minutes = String(today.getMinutes()).padStart(2, '0');
        let seconds = String(today.getSeconds()).padStart(2, '0');

        // Combina los componentes en el formato YYYY-MM-DD HH:mm:ss
        let formattedDateTime = year + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + seconds;


        const sentenciaUpdate = `
            UPDATE empleos
            SET 
                nombre = ?,
                descripcion = ?,
                sueldo = ?,
                fecha_vencimiento = ?
                WHERE id = ?`;

        // Define los valores que se utilizarán en la consulta
        const valores = [puesto, descripcion, sueldo, fecha, idEmpleo];
        console.log(valores)

        const conexion = bd()
        conexion.query(sentenciaUpdate, valores, (error, results) => {
                if (error) {
                    console.error('Error al ejecutar la consulta:', error);
                    res.status(500).json({ error: 'Error al ejecutar la consulta' });
                    return;
                }
                if (results.affectedRows  > 0) {
                    // Si se encontraron datos, renderizar el dashboard con los datos del usuario
                    return res.redirect('/empleo');
                } else {
                    // Si no se encontraron datos, renderizar la página de login con un mensaje de error
                    return res.render('empleo', { data: null, alertMessage: 'Empleo no encontrado', username: userData });
                }
            })

    } catch (error) {
        console.error(error)
        res.render('empleo', { alertMessage: 'Error interno del servidor. Inténtalo de nuevo más tarde.' });
    }
}

exports.deleteJob = async (req, res) => {
    try {
        const userData = usernameGlobal.getUserGlobal();

        let idEmpleo = req.body.datosDelete

        const conexion = bd()
        conexion.query('select * from empleos where estado = 1 AND id = ?',
            [idEmpleo], (error, results) => {
                if (error) {
                    console.error('Error al ejecutar la consulta:', error);
                    res.status(500).json({ error: 'Error al ejecutar la consulta' });
                    return;
                }
                if (results.length > 0) {
                    // Si se encontraron datos, renderizar el dashboard con los datos del usuario
                    return res.render('eliminarEmpleo', { data: results, username: userData });
                } else {
                    // Si no se encontraron datos, renderizar la página de login con un mensaje de error
                    return res.render('empleo', { data: null, alertMessage: 'Empleo no encontrado' });
                }
            })

    } catch (error) {
        console.error(error)
        // Si hay un error, envía una alerta y permanece en la misma página
        res.render('empleo', { alertMessage: 'Error interno del servidor. Inténtalo de nuevo más tarde.' });
    }
}


exports.aplicarEmpleo = async (req, res) => {

    try {

        let datos = req.body.datos

        // Construir la consulta de inserción
        const insercion = 'INSERT INTO empleos (id, fecha_creacion, fecha_vencimiento, fecha_modificacion, estado,' +
            ' nombre, descripcion, sueldo) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
        //const valores = [null, today, fecha, today, 1, puesto, descripcion, sueldo]; // Reemplaza valor1, valor2, valor3 con los valores que deseas insertar
        // const conexion = bd();
        // conexion.query(insercion, valores, (error, results) => {
        //     if (error) {
        //         console.error('Error al insertar en la base de datos:', error);
        //         return res.status(500).json({ error: 'Error al insertar en la base de datos' });
        //     }

        //     // Verificar si se insertó correctamente
        //     if (results.affectedRows > 0) {
        //         // Si se insertó al menos una fila, significa que se insertó correctamente
        //         console.log('Inserción exitosa');
        //         conexion.query('select * from empleos where estado = 1', (error, results) => {
        //             if (error) {
        //                 console.error('Error al ejecutar la consulta:', error);
        //                 res.status(500).json({ error: 'Error al ejecutar la consulta' });
        //                 return;
        //             }
        //             if (results.length > 0) {
        //                 // Si se encontraron datos, renderizar el dashboard con los datos del usuario
        //                 const userData = usernameGlobal.getUserGlobal();
        //                 return res.render('empleo', { data: results, username: userData });
        //             } else {
        //                 // Si no se encontraron datos, renderizar la página de login con un mensaje de error
        //                 return res.render('empleo', { data: null, username: userData, alertMessage: 'Usuario no encontrado' });
        //             }
        //         })
        //         // return res.render('empleo', { alertMessage: 'Creacion de empleo Exitoso ' + cui})
        //     } else {
        //         // Si no se insertó ninguna fila, significa que no se pudo insertar
        //         console.log('No se pudo insertar');
        //         return res.render('createUser', { alertMessage: 'No se pudo crear usuario'})
        //     }
        return res.render('empleo', { data: null, alertMessage: 'Creacion de empleo Exitoso ' + datos, username: usernameGlobal.getUserGlobal() });
        // });
    } catch (error) {
        console.error(error)
        // Si hay un error, envía una alerta y permanece en la misma página
        res.render('login', { alertMessage: 'Error interno del servidor. Inténtalo de nuevo más tarde.' });
    }

}

exports.findApplicationJob = async (req, res) => {

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
                const userData = usernameGlobal.getUserGlobal();
                return res.render('listadoProcesos', { data: results, username: userData });
            } else {
                // Si no se encontraron datos, renderizar la página de login con un mensaje de error
                return res.render('listadoProcesos', { data: null, alertMessage: 'Usuario no encontrado' });
            }
        })
    } catch (error) {
        console.error(error)
        // Si hay un error, envía una alerta y permanece en la misma página
        res.render('login', { alertMessage: 'Error interno del servidor. Inténtalo de nuevo más tarde.' });
    }

}

exports.findCV = async (req, res) => {
    try {
        const userData = usernameGlobal.getUserGlobal();

        let idEmpleo = req.body.empleo

        let queryString = 'SELECT t1.id, id_empleo, id_usuario, t1.estado, path_foto, telefonos, profesion, t2.nombre, apellido, correo_electronico, ' +
        ' t3.nombre as nombreEmpleo, sueldo, descripcion, fecha_vencimiento, dpi as cui FROM ' +
        ' (SELECT id, id_empleo, id_usuario, estado, path_foto, telefonos, profesion FROM `solicitud` WHERE id_empleo = ? and estado = 1) as t1 ' +
        ' Join (Select id, nombre, apellido, correo_electronico, dpi from `usuarios`) as t2 on  t1.id_usuario = t2.id ' +
        ' Join ( Select id, nombre, sueldo, descripcion, fecha_vencimiento from `empleos` ) as t3 on t1.id_empleo = t3.id' 

        const conexion = bd()
        conexion.query(queryString,
            [idEmpleo], (error, results) => {
                if (error) {
                    console.error('Error al ejecutar la consulta:', error);
                    res.status(500).json({ error: 'Error al ejecutar la consulta' });
                    return;
                }
                if (results.length > 0) {
                    // Si se encontraron datos, renderizar el dashboard con los datos del usuario
                    bkAppliances.setApplications(results)
                    return res.render('listadoAplicaciones', { data: results, username: userData });
                } else {
                    // Si no se encontraron datos, renderizar la página de login con un mensaje de error
                    return res.render('listadoAplicaciones', { data: null, username: userData, alertMessage: 'No hay aplicaciones actualmente' });
                }
            })

    } catch (error) {
        console.error(error)
        // Si hay un error, envía una alerta y permanece en la misma página
        res.render('listadoProcesos', { alertMessage: 'Error interno del servidor. Inténtalo de nuevo más tarde.' });
    }
}