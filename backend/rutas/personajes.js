const express = require('express');
const router = express.Router();
const pool = require('../base_de_datos'); 

router.get('/aleatorio', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM personajes ORDER BY RANDOM() LIMIT 1');
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'No se encontraron personajes' });
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error al obtener personaje aleatorio:', error);
    res.status(500).json({ error: 'Error en la base de datos' });
  }
});

module.exports = router;

