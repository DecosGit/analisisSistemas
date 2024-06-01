// const { getConection } = require('../database/conexionSQLServer')
// const mssql = require('mssql');
const bd = require('../database/conexionSQL')
const usernameGlobal = require('./userGlobal')
const path = require('path');
const bkAplicantes = require('./bkAplicantes')
const nodemailer = require('nodemailer');

exports.crearSolicitud = (req, res) => {
    try
    {
        const solicitudData = req.body;
        // Aquí puedes procesar solicitudData y hacer la inserción en la base de datos
        // Asegúrate de manejar los archivos subidos también
        console.log(solicitudData);
        console.log("JSON CONVERTIDO")

        const idEmpleo = solicitudData.idEmpleo
        const idUsuario = solicitudData.idUsuario
        const dob = solicitudData.dob
        const maritalStatus = solicitudData.maritalStatus
        const residenceAddress = solicitudData.residenceAddress
        const notificationAddress = solicitudData.notificationAddress
        const phoneNumbers = solicitudData.phoneNumbers
        const estado = 1    
        const pathFoto = path.join(__dirname, `../resources/FotoCv/${solicitudData.cui}.jpg`)
        const nationality = solicitudData.nationality
        const profession = solicitudData.profession
        const nit = solicitudData.nit
        const sex = solicitudData.sex
        const pathAntecedentesPenales = path.join(__dirname, `../resources/AntecedentesPenales/${solicitudData.cui}.pdf`);
        const pathAntecedentesPoliciacos = path.join(__dirname, `../resources/AntecedentesPoliciacos/${solicitudData.cui}.pdf`);
        const pathAutentica = path.join(__dirname, `../resources/Autentica/${solicitudData.cui}.pdf`);
        const pathDeclaracionJurada = path.join(__dirname, `../resources/DeclaracionJurada/${solicitudData.cui}.pdf`);
        const pathDpi = path.join(__dirname, `../resources/Dpi/${solicitudData.cui}.pdf`);
        const pathRenas = path.join(__dirname, `../resources/Renas/${solicitudData.cui}.pdf`);
        const pathRtu = path.join(__dirname, `../resources/Rtu/${solicitudData.cui}.pdf`);
        const pathOtros = path.join(__dirname, `../resources/Otros/${solicitudData.cui}.pdf`);
        res.send('Solicitud recibida')

        // Construir la consulta de inserción
        const insercion = 'INSERT INTO solicitud (id, id_empleo, id_usuario, estado, path_foto, fecha_nacimiento, estado_civil, direccion_residencia, direccion_notificaciones, telefonos, nacionalidad, profesion, nit, sexo, path_antecedente_penales, path_antecedentes_policiacos, path_declaracion, path_autentica, path_dpi, path_renas, path_rtu, path_otros, anio_inicio_primaria, anio_fin_primaria, establecimiento_primaria, titulo_primaria, finalizado_primaria, anio_inicio_secundaria, anio_fin_secundaria, establecimiento_secundaria, titulo_secundaria, finalizado_secundaria, anio_inicio_diversificado, anio_fin_diversificado, establecimiento_diversificado, titulo_diversificado, finalizado_diversificado, anio_inicio_universitario, anio_fin_universitario, establecimiento_universitario, titulo_universitario, finalizado_universitario) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
        const valores = [null, idEmpleo, idUsuario, estado, pathFoto, dob, maritalStatus, residenceAddress, notificationAddress, phoneNumbers, nationality, profession, nit, sex, pathAntecedentesPenales, pathAntecedentesPoliciacos, pathDeclaracionJurada, pathAutentica, pathDpi, pathRenas, pathRtu, pathOtros, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null]; // Reemplaza valor1, valor2, valor3 con los valores que deseas insertar
        const conexion = bd();
        conexion.query(insercion, valores, (error, results) => {
            if (error) {
                console.error('Error al insertar en la base de datos:', error);
                return res.status(500).json({ error: 'Error al insertar en la base de datos' });
            }
        
            // Verificar si se insertó correctamente
            if (results.affectedRows > 0) {
                const userData = usernameGlobal.getUserGlobal();
                // Si se insertó al menos una fila, significa que se insertó correctamente
                console.log('Inserción exitosa');
                return res.render('empleo', { data: null, username: userData })
            } else {
                // Si no se insertó ninguna fila, significa que no se pudo insertar
                console.error('Error al insertar en la base de datos:', error);
                return res.status(500).json({ error: 'Error al insertar en la base de datos' });
            }
        });
    } catch (error) {
        console.error(error)
        // Si hay un error, envía una alerta y permanece en la misma página
        res.render('empleo', { data: null, alertMessage: 'Error al crear la solicitud' });
    }
};

exports.rechazarCV = (req, res) => {
    try {
        const userData = usernameGlobal.getUserGlobal();
        let infoJson = JSON.parse(req.body.data)
        
        let id_empleo =  infoJson.id_empleo
        let id_usuario = infoJson.id_usuario
        let id_solicitud = infoJson.id
        let estado = infoJson.estado
        let arrayData = [id_solicitud, id_usuario, id_empleo]

        let queryString = 'Update `solicitud` set estado = 0 where id = ? and id_usuario = ? and id_empleo = ?'

        const conexion = bd()
        conexion.query(queryString,
            arrayData, (error, results) => {
                if (error) {
                    console.error('Error al ejecutar la consulta:', error);
                    res.status(500).json({ error: 'Error al ejecutar la consulta' });
                    return;
                }
                if (results.affectedRows > 0) {
                    // Si se encontraron datos, renderizar el dashboard con los datos del usuario
                    let aplicaciones = bkAplicantes.getApplications()
                    let aplicacionesLimpio = aplicaciones.filter(item => item.id !== id_solicitud);
                    return res.render('listadoAplicaciones', { data: aplicacionesLimpio, username: userData });
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

exports.aceptarCV = async (req, res) => {
    try {
        const userData = usernameGlobal.getUserGlobal();
        let infoJson = JSON.parse(req.body.data)
        
        let id_empleo =  infoJson.id_empleo
        let id_usuario = infoJson.id_usuario
        let id_solicitud = infoJson.id
        let estado = infoJson.estado
        let arrayData = [id_solicitud, id_usuario, id_empleo]

        let queryString = 'Update `solicitud` set estado = 2 where id = ? and id_usuario = ? and id_empleo = ?'

        const conexion = bd()
        conexion.query(queryString,
            arrayData, async (error, results) => {
                if (error) {
                    console.error('Error al ejecutar la consulta:', error);
                    res.status(500).json({ error: 'Error al ejecutar la consulta' });
                    return;
                }
                if (results.affectedRows > 0) {
                    // Si se encontraron datos, renderizar el dashboard con los datos del usuario
                    let aplicaciones = bkAplicantes.getApplications()
                    
                    // let transporter = nodemailer.createTransport({
                    //     service: 'gmail',
                    //     auth: {
                    //         user: 'dcornels@miumg.edu.gt',
                    //         pass: 'Emiratos.3' // Usa una contraseña de aplicación si tienes 2FA habilitado
                    //     }
                    // });

                    // let mailOptions = {
                    //     from: 'dcornels@miumg.edu.gt',
                    //     to: "denniscornelsosa@gmail.com",
                    //     subject: "Confirmacion Laboral ",
                    //     text: "En Hora Buena!!!. Haz sido seleccionado para el puesto al cual aplicaste"
                    // };
                
                    // try {
                    //     let info = await transporter.sendMail(mailOptions);
                    //     console.log('Correo enviado:', info.response);
                    // } catch (error) {
                    //     console.error('Error al enviar el correo:', error);
                    // }

                    let aplicacionesLimpio = aplicaciones.filter(item => item.id !== id_solicitud);
                    return res.render('listadoAplicaciones', { data: aplicacionesLimpio, username: userData });
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