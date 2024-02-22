const db = require('mysql')

const conexion = db.createConnection({
    host: 'localhost',
    user: 'admin',
    password: 'admin',
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