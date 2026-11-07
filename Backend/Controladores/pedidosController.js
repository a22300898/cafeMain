const pedidosModel = require('../Modelos/pedidoModel');

async function procesarPedido(req, res) {
    try {
        const {
            nombre,
            correo,
            producto,
            cantidad,
            size_bebida,
            para_llevar,
            observaciones
        } = req.body;

        if (!nombre || !correo || !producto || !cantidad || !size_bebida) {
            throw new Error('ERR_CTRL_VALIDATION_MISSING: Faltan campos obligatorios para completar el pedido.');
        }

        const cantidadParsed = parseInt(cantidad);

        if (isNaN(cantidadParsed) || cantidadParsed <= 0) {
            throw new Error('ERR_CTRL_VALIDATION_CANTIDAD: La cantidad debe ser un número entero mayor a 0.');
        }
        const isParaLlevar = (para_llevar === 'true' || para_llevar === '1' || para_llevar === true) ? 1 : 0;

        let pedidoId;
        try {
            pedidoId = await pedidosModel.insertPedido(
                nombre,
                correo,
                producto,
                cantidadParsed,
                size_bebida,
                isParaLlevar,
                observaciones || ''
            );
        } catch (error) {
            throw new Error(`ERR_CTRL_SAVE_PEDIDO: No se pudo procesar el pedido. ${error.message}`);
        }

        const queryParams = new URLSearchParams({
            pedidoId: pedidoId,
            nombre: nombre,
            correo: correo,
            producto: producto,
            cantidad: cantidadParsed,
            size: size_bebida,
            llevar: isParaLlevar ? 'Si' : 'No',
            observaciones: observaciones
        }).toString();

        res.redirect(`/resumen.html?${queryParams}`);

    } catch (error) {
        console.error('Controller Error:', error.message);
        res.status(400).json({
            success: false,
            error: error.message
        });
    }
}

module.exports = {
    procesarPedido
};