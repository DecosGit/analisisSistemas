// const { getConection } = require('../database/conexionSQLServer')
// const mssql = require('mssql');
const bd = require('../database/conexionSQL')
const usernameGlobal = require('./userGlobal')
const path = require('path');

exports.crearSolicitud = async (req, res) => {

    try {
        const empleo = req.body.idEmpleo;
        const usuario = req.body.idUsuario; 
        const estado = 1;        
        const pathFoto = path.join(__dirname, `../resources/FotoCv/${req.body.cui}.jpg`);
        const nacimiento = req.body.fechaNacimiento;
        const estadoCiv = req.body.estadoCivil;
        const direccionRes = req.body.direccionResidencia;
        const direccionNot = req.body.direccionNotificaciones;
        const tel = req.body.telefonos;
        const naciona = req.body.nacionalidad;
        const profe = req.body.profesion;
        const nt = req.body.nit;
        const sex = req.body.sexo;
        const pathAntecedentesPenales = path.join(__dirname, `../resources/AntecedentesPenales/${req.body.cui}.pdf`);
        const pathAntecedentesPoliciacos = path.join(__dirname, `../resources/AntecedentesPoliciacos/${req.body.cui}.pdf`);
        const pathAutentica = path.join(__dirname, `../resources/Autentica/${req.body.cui}.pdf`);
        const pathDeclaracionJurada = path.join(__dirname, `../resources/DeclaracionJurada/${req.body.cui}.pdf`);
        const pathDpi = path.join(__dirname, `../resources/Dpi/${req.body.cui}.pdf`);
        const pathRenas = path.join(__dirname, `../resources/Renas/${req.body.cui}.pdf`);
        const pathRtu = path.join(__dirname, `../resources/Rtu/${req.body.cui}.pdf`);
        const pathOtros = path.join(__dirname, `../resources/Otros/${req.body.cui}.pdf`);
        
        // Construir la consulta de inserción
        const insercion = 'INSERT INTO solicitud (id, id_empleo, id_usuario, estado, path_foto, fecha_nacimiento, estado_civil, direccion_residencia, direccion_notificaciones, telefonos, nacionalidad, profesion, nit, sexo, path_antecedente_penales, path_antecedentes_policiacos, path_declaracion, path_autentica, path_dpi, path_renas, path_rtu, path_otros, anio_inicio_primaria, anio_fin_primaria, establecimiento_primaria, titulo_primaria, finalizado_primaria, anio_inicio_secundaria, anio_fin_secundaria, establecimiento_secundaria, titulo_secundaria, finalizado_secundaria, anio_inicio_diversificado, anio_fin_diversificado, establecimiento_diversificado, titulo_diversificado, finalizado_diversificado, anio_inicio_universitario, anio_fin_universitario, establecimiento_universitario, titulo_universitario, finalizado_universitario) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
        const valores = [null, empleo, usuario, estado, pathFoto, nacimiento, estadoCiv, direccionRes, direccionNot, tel, naciona, profe, nt, sex, pathAntecedentesPenales, pathAntecedentesPoliciacos, pathDeclaracionJurada, pathAutentica, pathDpi, pathRenas, pathRtu, pathOtros, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null]; // Reemplaza valor1, valor2, valor3 con los valores que deseas insertar
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
                return res.render('empleo', { alertMessage: 'Creacion de solicitud exitosa'})
            } else {
                // Si no se insertó ninguna fila, significa que no se pudo insertar
                console.log('No se pudo insertar');
                return res.render('empleo', { alertMessage: 'No se pudo crear usuario'})
            }
        });
    } catch (error) {
        console.error(error)
        // Si hay un error, envía una alerta y permanece en la misma página
        res.render('login', { alertMessage: 'Error interno del servidor. Inténtalo de nuevo más tarde.' });
    }
}