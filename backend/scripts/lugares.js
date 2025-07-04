const {Pool} = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'multiversus',
    password: 'postgres',
    port: 5432,
});

async function getAllLugares()
{
    const result = await dbClient.query('SELECT * FROM lugares');
    return result.rows;
}

async function getOneLugar(id)
{
    const result = await dbClient.query('SELECT * FROM lugares WHERE id = $1 LIMIT 1', [id]);    
    return result.rows[0];
}

async function getLugaresByOrigen(origen_id)
{
    const result = await dbClient.query('SELECT * FROM lugares WHERE origen_id = $1', [origen_id]);
    return result.rows;
}

async function createLugar(nombre, descripcion, origen_id, imagen)
{
    const result = await dbClient.query('INSERT INTO personajes (nombre, descripcion, origen_id, imagen) VALUES ($1, $2, $3, $4) RETURNING *', [nombre, descripcion, origen_id, imagen]);
    if(result.rowCount === 0)
    {
        return undefined;
    }
    else 
    {
        return result.rows[0];
    }
}

async function deleteLugar(id)
{
    const result = await dbClient.query('DELETE FROM lugares WHERE id = $1', [id]);
    if(result.rowCount === 0)
    {
        return undefined;
    }
    else
    {
        return id;
    }    
}

async function updateLugar(id, nombre, descripcion, origen_id, imagen)
{
    const result = await dbClient.query('UPDATE personajes SET nombre = $1, descripcion = $2, origen_id = $3, imagen = $4 WHERE id = $5 RETURNING *', [nombre, descripcion, origen_id, imagen, id]);
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
    getAllLugares,
    getOneLugar,
    createLugar,
    deleteLugar,
    updateLugar
};