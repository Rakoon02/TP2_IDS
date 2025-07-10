
const pool = require('../base_de_datos');

async function getAllUniversos()
{
    const result = await pool.query('SELECT * FROM universos');
    return result.rows;
}

async function getOneUniverso(id)
{
    const result = await pool.query('SELECT * FROM universos WHERE id = $1 LIMIT 1', [id]);    

    return result.rows[0];
}

async function createUniverso(nombre, creador, fecha, descripcion, imagen) {
    try {
        const result = await pool.query(
            'INSERT INTO universos (nombre, creador, fecha, descripcion, imagen) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [nombre, creador, fecha, descripcion, imagen]
        );
        
        if (result.rowCount === 0) {
            return undefined;
        } else {
            return result.rows[0];
        }
    } catch (error) {
        console.error('Error en createUniverso:', error);
        return undefined;
    }
}

async function deleteUniverso(id)
{
    const result = await pool.query('DELETE FROM universos WHERE id = $1', [id]);
    if(result.rowCount === 0)
    {
        return undefined;
    }
    else
    {
        return id;
    }    
}

async function updateUniverso(id, nombre, creador, fecha, descripcion, imagen)
{
    const result = await pool.query('UPDATE universos SET nombre = $1, creador = $2, fecha = $3, descripcion = $4, imagen = $5 WHERE id = $6 RETURNING *', [nombre, creador, fecha , descripcion, imagen, id]);
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
