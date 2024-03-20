// Importar la librería 'mysql'
const mysql = require('mysql');

// Configuración de la conexión a la base de datos
const dbConfig = {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'gestioncontratos'
};

// Función para conectar a la base de datos
function conectarBaseDeDatos() {
    // Crear la conexión
    const connection = mysql.createConnection(dbConfig);

    // Conectar a la base de datos
    connection.connect((err) => {
        if (err) {
            console.error('Error de conexión a la base de datos:', err);
            return;
        }
        console.log('Conexión exitosa a la base de datos!');
    });

    // Retornar la conexión para que pueda ser utilizada externamente
    return connection;
}

// Exportar la función para que pueda ser utilizada desde otros módulos
module.exports = conectarBaseDeDatos;
