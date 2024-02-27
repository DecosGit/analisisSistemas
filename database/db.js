const db = require('mysql')

const conexion = db.createConnection({
    host: 'proyecto-as1-v1.checawq2oo9w.us-east-2.rds.amazonaws.com:1433',
    user: 'Administrador',
    password: '!$1st3m4$',
    database: 'usuarios'
})

conexion.connect((error) =>{
    if(error){
        console.error(error);
        return
    }
    console.log('Conectado a la base de datos');
})


module.exports = conexion