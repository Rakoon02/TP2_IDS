const pool = require('../base_de_datos');


async function getAllPersonajes()
{
    const result = await pool.query('SELECT personajes.*,universos.nombre as nombre_universo FROM personajes JOIN universos ON personajes.origen_id = universos.id');
    return result.rows;
}

async function getPersonajesByOrigen(origen_id)
{
    const result = await pool.query('SELECT * FROM personajes WHERE origen_id = $1', [origen_id]);
    return result.rows;
}

async function getOnePersonaje(id)
{
    const result = await pool.query('SELECT * FROM personajes WHERE id = $1 LIMIT 1', [id]);    
    return result.rows[0];
}

async function createPersonaje(nombre, origen_id, descripcion, poder, imagen)
{
    const result = await pool.query('INSERT INTO personajes (nombre, origen_id, descripcion, poder, imagen) VALUES ($1, $2, $3, $4, $5) RETURNING *', [nombre, origen_id, descripcion, poder, imagen]);
    if(result.rowCount === 0)
    {
        return undefined;
    }
    else 
    {
        return result.rows[0];
    }
}

async function deletePersonaje(id)
{
    const result = await pool.query('DELETE FROM personajes WHERE id = $1', [id]);
    if(result.rowCount === 0)
    {
        return undefined;
    }
    else
    {
        return id;
    }    
}

async function updatePersonaje(id, nombre, origen_id, descripcion, poder, imagen)
{
    const result = await pool.query('UPDATE personajes SET nombre = $1, origen_id = $2, descripcion = $3, poder = $4, imagen = $5 WHERE id = $6 RETURNING *', [nombre, origen_id, descripcion, poder, imagen, id]);
    if(result.rowCount === 0)
    {
        return undefined;
    }
    else
    {
        return result.rows[0];
    }
}

module.exports = {
    getAllPersonajes,
    getOnePersonaje,
    createPersonaje,
    deletePersonaje,
    updatePersonaje,
    getPersonajesByOrigen
};
