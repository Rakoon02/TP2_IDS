const express = require('express');
const app = express();
const PORT = 3000;
const pool = require('./base_de_datos');
const cors = require('cors');
const personajesRuta = require('./rutas/personajes');
const path = require('path');

app.use(express.json());
app.use(cors());


app.use('/api/personajes', personajesRuta);
app.use(express.static(path.join(__dirname, '../frontend')));

app.get('/test-database', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.json({ success: true, time: result.rows[0].now });
  } catch (error) {
    console.error('Error en conexión', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

//Get un personaje
app.get('/api/personajes/:id', async (req, res) => {
    //res.json({ status: 'OK'})
});

//Get todos los personajes
app.get('/api/personajes/', async (req, res) => {
    //res.json({ status: 'OK'})
});

//Post un personaje
app.post('/api/personajes/', async (req, res) => {
    //res.json({ status: 'OK'})
});

//Delete un personaje
app.delete('/api/personajes/:id', async (req, res) => {
    //res.json({ status: 'OK'})
});

//Update un personaje
app.put('/api/personajes/', async (req, res) => {
    //res.json({ status: 'OK'})
});


app.listen(PORT, () => {
	console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
