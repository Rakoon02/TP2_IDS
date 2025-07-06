const pool = require('../base_de_datos');

async function getAllLugares()
{
    const result = await pool.query('SELECT lugares.*,universos.nombre AS nombre_universo FROM lugares JOIN universos ON lugares.origen_id = universos.id');
    return result.rows;
}

async function getOneLugar(id)
{
    const result = await pool.query('SELECT lugares.*,universos.nombre AS nombre_universo FROM lugares JOIN universos ON lugares.origen_id = universos.id WHERE lugares.id = $1 LIMIT 1', [id]);    
    return result.rows[0];
}

async function getLugaresByOrigen(origen_id)
{
    const result = await pool.query('SELECT lugares.*,universos.nombre AS nombre_universo FROM lugares JOIN universos ON lugares.origen_id = universos.id WHERE lugares.origen_id = $1', [origen_id]);
    return result.rows;
}

async function createLugar(nombre, descripcion, origen_id, imagen)
{
    const result = await pool.query(
        'INSERT INTO lugares (nombre, descripcion, origen_id, imagen) VALUES ($1, $2, $3, $4) RETURNING *',
        [nombre, descripcion, origen_id, imagen]
    );
    if (result.rowCount === 0) {
        return undefined;
    } else {
        return result.rows[0];
    }
}

async function deleteLugar(id)
{
    const result = await pool.query('DELETE FROM lugares WHERE id = $1', [id]);
    if (result.rowCount === 0) {
        return undefined;
    } else {
        return id;
    }    
}

async function updateLugar(id, nombre, descripcion, origen_id, imagen)
{
    const result = await pool.query(
        'UPDATE lugares SET nombre = $1, descripcion = $2, origen_id = $3, imagen = $4 WHERE id = $5 RETURNING *',
        [nombre, descripcion, origen_id, imagen, id]
    );
    if (result.rowCount === 0) {
        return undefined;
    } else {
        return result.rows[0];
    }
}

module.exports = {
    getAllLugares,
    getOneLugar,
    createLugar,
    deleteLugar,
    updateLugar,
    getLugaresByOrigen
};
