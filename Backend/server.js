const express = require('express');
const path = require('path');
const app = express();
const pedidosRoutes = require('./Rutas/pedidosRoutes');
require('dotenv').config();

app.use(express.static(path.join(__dirname, '../Frontend')));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/', pedidosRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});