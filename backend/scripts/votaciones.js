const pool = require('../base_de_datos');

async function createVotacion(id_pj1, id_pj2, fecha, lugar_id, ganador_id)
{
    const result = await pool.query('INSERT INTO duelo (personaje1_id, personaje2_id, fecha, lugar_id, ganador_id) VALUES ($1, $2, $3, $4, $5) RETURNING *', [id_pj1, id_pj2, fecha, lugar_id, ganador_id]);
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
    createVotacion,
};