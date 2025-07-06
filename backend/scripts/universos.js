const {Pool} = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'multiversus',
    password: 'postgres',
    port: 5432,
});

async function getAllUniversos()
{
    const result = await dbClient.query('SELECT * FROM universos');
    return result.rows;
}

async function getOneUniverso(id)
{
    const result = await dbClient.query('SELECT * FROM universos WHERE id = $1 LIMIT 1', [id]);    
    return result.rows[0];
}

async function createUniverso(nombre, creador, fecha, descripcion, pais)
{
    const result = await dbClient.query('INSERT INTO universos (nombre, creador, fecha, descripcion, pais) VALUES ($1, $2, $3, $4, $5) RETURNING *', [nombre, creador, fecha, descripcion, pais]);
    if(result.rowCount === 0)
    {
        return undefined;
    }
    else 
    {
        return result.rows[0];
    }
}

async function deleteUniverso(id)
{
    const result = await dbClient.query('DELETE FROM universos WHERE id = $1', [id]);
    if(result.rowCount === 0)
    {
        return undefined;
    }
    else
    {
        return id;
    }    
}

async function updateUniverso(id, nombre, creador, fecha, descripcion, pais)
{
    const result = await dbClient.query('UPDATE universos SET nombre = $1, creador = $2, fecha = $3, descripcion = $4, pais = $5 WHERE id = $6 RETURNING *', [nombre, creador, fecha , descripcion, pais, id]);
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
    getAllUniversos,
    getOneUniverso,
    createUniverso,
    deleteUniverso,
    updateUniverso
};
