const { getConection } = require('../database/conexionSQLServer')
const mssql = require('mssql');

exports.findUser = async (req, res) => {

    try {
        let username = req.body.username
        let password = req.body.password
        console.log(username + ' ' + password);

        if(!username){
            res.render('login')
        }

        const pool = await getConection()
        const result = await pool.query`
            SELECT TOP 1 1
            FROM dbo.usuario
            WHERE id_usuario = ${username} AND password = ${password} AND estado = 1`;

        if (result.recordset.length > 0) {
            // Si se encontraron datos, renderiza la vista
            res.render('dashboard', { username: username, data: result.recordset, alertMessage: 'Bienvenido ' + username });
        } else {
            // Si no se encontraron datos, envía una alerta y permanece en la misma página
            res.render('login', { alertMessage: 'Verifica tu nombre de usuario y contraseña' });
        }

    } catch (error) {
        console.error(error)
        // Si hay un error, envía una alerta y permanece en la misma página
        res.render('login', { alertMessage: 'Error interno del servidor. Inténtalo de nuevo más tarde.' });
    }

}

exports.createUser = async (req, res) => 
{
    try 
    {
        let correo = req.body.correo
        let cui = req.body.cui
        let contrasenia = req.body.contrasenia
        let primerNombre = req.body.primerNombre
        let segundoNombre = req.body.segundoNombre || ""
        let otrosNombres = req.body.tercerNombre || ""
        let primerApellido = req.body.primerApellido
        let segundoApellido = req.body.segundoApellido || ""
        let apellidoCasada = req.body.apellidoCasada || ""

        let nombreCompleto = `${primerNombre} ${segundoNombre} ${otrosNombres} ${primerApellido} ${segundoApellido}`

        if (apellidoCasada) 
        {
            nombreCompleto += ` de ${apellidoCasada}`
        }
        // Eliminar espacios adicionales
        nombreCompleto = nombreCompleto.replace(/\s+/g, ' ').trim()
        
        let hoy = new Date()
        let dia = hoy.getDate()
        let mes = hoy.getMonth() + 1 // Los meses van de 0 a 11, por eso se suma 1
        let anio = hoy.getFullYear()
        let fechaCorta = `${dia}/${mes}/${anio}`
         
        const pool = await getConection();
        const request = pool.request();

        // Ejecutar el procedimiento almacenado
        const result = await request
            .input('id_usuario', mssql.NVarChar(50), cui)
            .input('password', mssql.NVarChar(25), contrasenia)
            .input('estado', mssql.TinyInt, 1)
            .input('accion', mssql.Char(1), 'I')
            .input('nombre_reporte', mssql.VarChar(100), nombreCompleto)
            .input('email', mssql.VarChar(100), correo)
            .input('usuario_ing', mssql.VarChar(50), 'admin')
            .input('fecha_ing', mssql.SmallDateTime, fechaCorta)
            .input('usuario_act', mssql.VarChar, null)
            .input('fecha_act', mssql.SmallDateTime, null)
            .input('nombre_completo', mssql.VarChar(mssql.MAX), nombreCompleto)
            .input('cod_unidad', mssql.VarChar(6), null)
            .input('cod_puesto', mssql.SmallInt, null)
            .input('cod_rol_usuario', mssql.VarChar(10), 'contr')
            .input('cui', mssql.VarChar(15), cui)
            .execute('sp_acciones_usuario');
        
            res.render('login', { alertMessage: 'Tu usuario es: ' + cui});

    } catch (error) 
    {
        console.error(error);
        // Mostrar mensaje de error
        res.render('createUser', { alertMessage: 'Error interno del servidor al crear tu usuario. Inténtalo de nuevo más tarde.' });
    }

}