const mssql = require('mssql');

const conectionSettings = {
    server: 'proyecto-as1-v1.checawq2oo9w.us-east-2.rds.amazonaws.com',
    database: 'proyecto_as1_v1',
    user: 'Administrador',
    password: '!$1st3m4$',
    options: {
        encrypt: true,
        trustServerCertificate: true
    }
}

async function getConection(){
    try {
        return await mssql.connect(conectionSettings)
    } catch (error) {
        console.error(error)
    }
}

module.exports = { getConection, mssql };