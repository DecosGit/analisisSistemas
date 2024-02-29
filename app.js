const express = require('express');
const app = express();

app.use(express.static('./views/styles'));
app.use(express.static('./resources/img'));
app.use('/', require('./router'));
app.set('view engine', 'ejs');


// Una vez definidas nuestras rutas podemos iniciar el servidor
app.listen(5000, err => {
    if (err) {
        // Aquí manejar el error
        console.error("Error escuchando: ", err);
        return;
    }
    // Si no se detuvo arriba con el return, entonces todo va bien ;)
    console.log(`http://localhost:5000`);
});