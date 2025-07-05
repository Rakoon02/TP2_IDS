const express = require('express');
const app = express();
const PORT = 3000;
const pool = require('./base_de_datos')

app.use(express.json());

app.get('/test-database', async (req,res) => {
	try{
    const result = await pool.query('SELECT NOW()');
    res.json({ success: true, time: result.rows[0].now });
    } catch (error) {
    console.error('Error en conexion', error);
    res.status(500).json({ success: false, error: error.message});
    }
});

app.listen(PORT, () => {
	console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
