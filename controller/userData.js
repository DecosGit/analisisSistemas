const { getConection } = require('../database/conexionSQLServer')

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
        let cui = req.body.cui
        let contrasenia = req.body.contrasenia
        console.log(cui + ' ' + contrasenia);

        const pool = await getConection();
        const request = pool.request();

        // Ejecutar el procedimiento almacenado
        const result = await request
            .input('id_usuario', mssql.NVarChar(50), cui)
            .input('password', mssql.NVarChar(25), contrasenia)
            .input('estado', mssql.TinyInt, 1)
            .input('accion', mssql.Char(1), 'I')
            .execute('sp_acciones_usuario');
        
            res.render('login', { alertMessage: 'Usuario creado exitosamente, tu usuario es: ' + cui});

    } catch (error) 
    {
        console.error(error);
        // Mostrar mensaje de error
        res.render('createUser', { alertMessage: 'Error interno del servidor al crear tu usuario. Inténtalo de nuevo más tarde.' });
    }

}