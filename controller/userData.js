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

