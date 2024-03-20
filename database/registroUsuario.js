const { getConection, mssql } = require('./conexionSQLServer');

async function registrarUsuario() {
    var cui = document.getElementById("uiCui").value;
    var contrasenia = document.getElementById("uiContrasenia").value;

    try {
        const pool = await getConection();
        const request = pool.request();

        // Ejecutar el procedimiento almacenado
        const result = await request
            .input('id_usuario', mssql.NVarChar(50), cui)
            .input('password', mssql.NVarChar(25), contrasenia)
            .input('estado', mssql.TinyInt, 1)
            .input('accion', mssql.Char(1), 'I')
            .execute('sp_acciones_usuario');
        
        // Mostrar mensaje de éxito
        Swal.fire({
            icon: 'success',
            title: 'Éxito',
            text: 'Usuario registrado correctamente',
        });

        // Limpiar formulario
        document.getElementById("formularioUsuario").reset();

    } catch (error) {
        console.log("Entramos en error");
        console.error(error);
        // Mostrar mensaje de error
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Ha ocurrido un error al registrar el usuario',
        });
    }
}