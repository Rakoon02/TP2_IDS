const express = require('express');
const router = express.Router();
const pool = require('../base_de_datos');

router.get('/aleatorio', async (req, res) => {
  try {
    const query = `
      SELECT p.*, u.nombre AS nombre_universo
      FROM personajes p
      LEFT JOIN universos u ON p.origen_id = u.id
      ORDER BY RANDOM()
      LIMIT 1;
    `;
    const result = await pool.query(query);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'No se encontraron personajes' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error al obtener personaje aleatorio:', error);
    res.status(500).json({ error: 'Error en la base de datos' });
  }
});


router.delete('api/personajes/:id', (req, res) => {
  const id = req.params.id;
  pool.query('DELETE FROM personajes WHERE id = $1', [id], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Error al eliminar personaje");
    }
    res.send("Personaje eliminado");
  });
});

module.exports = router;
