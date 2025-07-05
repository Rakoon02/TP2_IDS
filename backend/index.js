const express = require('express');
const app = express();
const PORT = 3000;
const pool = require('./base_de_datos');
const cors = require('cors');
const personajesRuta = require('./rutas/personajes');
const path = require('path');

app.use(cors());
app.use(express.json());

app.use('/api/personajes', personajesRuta);
app.use(express.static(path.join(__dirname, '../frontend')));

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

//Get personajes por origen
app.get('/api/personajes/origen/:origen_id', async (req, res) => {
    const personajes = await getPersonajesByOrigen(req.params.origen_id);
    if (personajes.length > 0) {
        res.json(personajes);
    } else {
        res.status(404).json({ error: 'No se encontraron personajes para el origen especificado' });
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
    res.json({ status: 'OK' });
});

//Update un personaje
app.put('/api/personajes/', async (req, res) => {
    if (!req.body.id || !req.body.nombre || !req.body.origen_id || !req.body.descripcion || !req.body.poder) {
        return res.status(400).json({ error: 'Faltan datos requeridos' });
    }

    const personaje = await updatePersonaje(req.body.id, req.body.nombre, req.body.origen_id, req.body.descripcion, req.body.poder, req.body.imagen);
    if (!personaje) {
        return res.status(404).json({ error: 'Personaje no encontrado' });
    }
    res.json(personaje);
});

//Get todos los universos
app.get('/api/universos/', async (req, res) => {
    const universos = await getAllUniversos();
    res.json(universos);
});

//Get un universo
app.get('/api/universos/:id', async (req, res) => {
    const universo = await getOneUniverso(req.params.id);
    if (universo) {
        res.json(universo);
    } else {   
        res.status(404).json({ error: 'Universo no encontrado' });
    }
});

//Post un universo
app.post('/api/universos/', async (req, res) => {
    if (!req.body.nombre || !req.body.creador || !req.body.fecha || !req.body.descripcion || !req.body.pais) {
        return res.status(400).json({ error: 'Faltan datos requeridos' });
    }

    const universo = await createUniverso(req.body.nombre, req.body.creador, req.body.fecha, req.body.descripcion, req.body.pais);
    if (!universo) {
        return res.status(500).json({ error: 'Error al crear el universo' });
    }
    res.json(universo);
});

//Delete un universo
app.delete('/api/universos/:id', async (req, res) => {
    const result = await deleteUniverso(req.params.id);
    if (result.rowCount === 0) {
        return res.status(404).json({ error: 'Universo no encontrado' });
    }
    res.json({ status: 'OK' });
});

//Update un universo
app.put('/api/universos/', async (req, res) => {
    if (!req.body.id || !req.body.nombre || !req.body.creador || !req.body.fecha || !req.body.descripcion || !req.body.pais) {
        return res.status(400).json({ error: 'Faltan datos requeridos' });
    }

    const universo = await updateUniverso(req.body.id, req.body.nombre, req.body.creador, req.body.fecha, req.body.descripcion, req.body.pais);
    if (!universo) {
        return res.status(404).json({ error: 'Universo no encontrado' });
    }
    res.json(universo);
});

//Get todos los lugares
app.get('/api/lugares/', async (req, res) => {
    const lugares = await getAllLugares();
    res.json(lugares);
});

//Get un lugar
app.get('/api/lugares/:id', async (req, res) => {
    const lugar = await getOneLugar(req.params.id);
    if (lugar) {
        res.json(lugar);
    } else {
        res.status(404).json({ error: 'Lugar no encontrado' });
    }
});

//Get lugares por origen
app.get('/api/lugares/origen/:origen_id', async (req, res) => {
    const lugares = await getLugaresByOrigen(req.params.origen_id);
    if (lugares.length > 0) {
        res.json(lugares);
    } else {
        res.status(404).json({ error: 'No se encontraron lugares para el origen especificado' });
    }
});

//Post un lugar
app.post('/api/lugares/', async (req, res) => {
    if (!req.body.nombre || !req.body.descripcion || !req.body.universo) {
        return res.status(400).json({ error: 'Faltan datos requeridos' });
    }

    const lugar = await createLugar(req.body.nombre, req.body.descripcion, req.body.universo, req.body.imagen);
    if (!lugar) {
        return res.status(500).json({ error: 'Error al crear el lugar' });
    }
    res.json(lugar);
});

//Delete un lugar
app.delete('/api/lugares/:id', async (req, res) => {
    const result = await deleteLugar(req.params.id);
    if (result.rowCount === 0) {
        return res.status(404).json({ error: 'Lugar no encontrado' });
    }
    res.json({ status: 'OK' });
});

//Update un lugar
app.put('/api/lugares/', async (req, res) => {
    if (!req.body.id || !req.body.nombre || !req.body.descripcion || !req.body.universo) {
        return res.status(400).json({ error: 'Faltan datos requeridos' });
    }

    const lugar = await updateLugar(req.body.id, req.body.nombre, req.body.descripcion, req.body.universo, req.body.imagen);
    if (!lugar) {
        return res.status(404).json({ error: 'Lugar no encontrado' });
    }
    res.json(lugar);
});

app.listen(PORT, () => {
	console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
