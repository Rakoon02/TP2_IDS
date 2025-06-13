const escpress = require('express');
const app = express();
const PORT = process.enc.PORT || 3000;

app.use(express.json());

app.get('/', (req,res) => {
	res.send('Backend');
});

app.post('/api/hello', (req,res) => {
	const user = req.body;
	res.status(201).json({ message: 'Usuario creado', user});
});

app.listen(PORT, () => {
	console.log('Servidor corriendo en http://localhost:${PORT}');
});


