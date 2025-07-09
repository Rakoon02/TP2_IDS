const express = require('express');
const router = express.Router();
const pool = require('../base_de_datos'); 

router.get('/aleatorio', async (req, res) => {
  try {
    const query = `
      SELECT *
      FROM lugares
      ORDER BY RANDOM()
      LIMIT 1;`
    ;

    const result = await pool.query(query);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'No se encontro el lugar' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error al obtener lugar aleatorio:', error);
    res.status(500).json({ error: 'Error en la base de datos' });
  }
});

module.exports = router;