const express = require('express');
const app = express();

app.use(express.static(__dirname))
app.use(express.static('./views/styles'));
app.use(express.urlencoded({ extended: false}))
app.use(express.json())
app.set('view engine', 'ejs');
app.use('/', require('./router'));

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