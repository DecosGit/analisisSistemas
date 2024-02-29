const { getConection, mssql } = require("./conexionSQLServer");

const getUsers = async () => {
    try {
        const pool = await getConection()
        const result = await pool.request().query("select * from dbo.usuario")
        console.log(result.recordset)

    } catch (error) {
        console.error(error)
    }
}

module.exports = { getUsers };