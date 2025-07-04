const {Pool} = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'multiversus',
    password: 'postgres',
    port: 5432,
});

async function getAllPersonajes()
{
    const result = await dbClient.query('SELECT * FROM personajes');
    return result.rows;
}

async function getOnePersonaje(id)
{
    const result = await dbClient.query('SELECT * FROM personajes WHERE id = $1 LIMIT 1', [id]);    
    return result.rows[0];
}

async function createPersonaje(nombre, origen_id, descripcion, poder, imagen)
{
    const result = await dbClient.query('INSERT INTO personajes (nombre, origen_id, descripcion, poder, imagen) VALUES ($1, $2, $3, $4, $5) RETURNING *', [nombre, origen_id, descripcion, poder, imagen]);
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
    const result = await dbClient.query('DELETE FROM personajes WHERE id = $1', [id]);
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
    const result = await dbClient.query('UPDATE personajes SET nombre = $1, origen_id = $2, descripcion = $3, poder = $4, imagen = $5 WHERE id = $6 RETURNING *', [nombre, origen_id, descripcion, poder, imagen, id]);
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
    updatePersonaje
};
