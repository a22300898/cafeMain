const pool = require('../Config/database');
async function insertPedido(nombre, correo, producto, cantidad, sizeBebida, paraLlevar, observaciones) {
    try {
        const query = `
            INSERT INTO pedidos 
            (nombre, correo, producto, cantidad, size_bebida, para_llevar, observaciones) 
            VALUES (?, ?, ?, ?, ?, ?, ?)
        `;
        const [result] = await pool.query(query, [
            nombre,
            correo,
            producto,
            cantidad,
            sizeBebida,
            paraLlevar,
            observaciones
        ]);
        return result.insertId;
    } catch (error) {
        throw new Error(`ERR_MODEL_PEDIDO_INSERT: Error al guardar el pedido. Detalle: ${error.message}`);
    }
}

module.exports = {
    insertPedido
};