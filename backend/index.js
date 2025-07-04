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
    console.error('Error en coneccion', error);
    res.status(500).json({ success: false, error: error.message});
    }
});

const {
    getAllPersonajes,
    getOnePersonaje,
    createPersonaje,
    deletePersonaje,
    updatePersonaje,
    getPersonajesByOrigen
} = require('./scripts/personajes');

const {
    getAllUniversos,
    getOneUniverso,
    createUniverso,
    deleteUniverso,
    updateUniverso
} = require('./scripts/universos');

const {
    getAllLugares,
    getOneLugar,
    createLugar,
    deleteLugar,
    updateLugar,
    getLugaresByOrigen
} = require('./scripts/lugares');

//Get todos los personajes
app.get('/api/personajes/', async (req, res) => {
    const personajes = await getAllPersonajes();
    res.json(personajes);
});

//Get un personaje
app.get('/api/personajes/:id', async (req, res) => {
    const personaje = await getOnePersonaje(req.params.id);
    if (personaje) {
        res.json(personaje);
    } else {
        res.status(404).json({ error: 'Personaje no encontrado' });
    }
});

//Post un personaje
app.post('/api/personajes/', async (req, res) => {
    if (!req.body.nombre || !req.body.origen_id || !req.body.descripcion || !req.body.poder) {
        return res.status(400).json({ error: 'Faltan datos requeridos' });
    }

    const personaje = await createPersonaje(req.body.nombre, req.body.origen_id, req.body.descripcion, req.body.poder, req.body.imagen);
    if(result.rowCount === 0) {
        return undefined;
    } else {
        return result.rows[0];
    }

    if (!personaje) {
        return res.status(500).json({ error: 'Error al crear el personaje' });
    }
    res.status(201).json(personaje);

});

//Delete un personaje
app.delete('/api/personajes/:id', async (req, res) => {
    const result = await deletePersonaje(req.params.id);
    if (result.rowCount === 0) {
        return res.status(404).json({ error: 'Personaje no encontrado' });
    }
    res.json({ status: 'OK' });

    const personaje = await deletePersonaje(req.params.id);

    if (!personaje) {
        return res.status(404).json({ error: 'Personaje id: ' + req.params.id + 'no ecntrado' });
    }
    res.json({ status: 'OK', id : personaje});
});

//Update un personaje
app.put('/api/personajes/', async (req, res) => {
    res.json({ status: 'OK'})
});


app.listen(PORT, () => {
	console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
