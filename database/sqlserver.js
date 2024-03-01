const { getConection, mssql } = require("./conexionSQLServer");

const getUsers = async () => {
    try {
        const pool = await getConection()
        const result = await pool.request().query("select * from dbo.usuario")
        console.log(result.recordset)
        return result
    } catch (error) {
        console.error(error)
    }
}

const seekUser = async (datos) => {
    try {
        let username = datos.username
        let password = datos.password

        const pool = await getConection()
        const result = await pool.query('SELECT id_usuario, password, estado FROM dbo.usuario')

        return result
    } catch (error) {
        console.error(error)
    }
}

module.exports = { getUsers, seekUser };