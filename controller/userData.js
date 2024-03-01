const { getConection } = require('../database/conexionSQLServer')

exports.findUser = async (req, res) => {

    try {
        let username = req.body.username
        let password = req.body.password
        console.log(username + ' ' + password);
        const pool = await getConection()
        const result = await pool.query`
            SELECT TOP 1 1
            FROM dbo.usuario
            WHERE id_usuario = ${username} AND password = ${password} AND estado = 1`;

        if (result.recordset.length > 0) {
            // Si se encontraron datos, renderiza la vista
            res.render('dashboard', { username: username, data: result.recordset });
        } else {
            // Si no se encontraron datos, puedes enviar alguna respuesta al cliente
            res.json({ message: 'No se encontraron datos para el usuario.' });
        }

    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Error interno del servidor' });
    }

}