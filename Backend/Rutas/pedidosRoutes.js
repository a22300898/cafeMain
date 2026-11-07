const express = require('express');
const router = express.Router();
const pedidosController = require('../Controladores/pedidosController');
router.post('/crear', pedidosController.procesarPedido);

module.exports = router;