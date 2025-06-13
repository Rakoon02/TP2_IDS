const escpress = require('express');
const app = express();
const PORT = process.enc.PORT || 3000;

app.use(express.json());
app.get('/', (req,res) => {
	res.send('Backend');
});
app.lister(PORT, () => {
	console.log('Servidor corriendo en http://localhost:${PORT}');
});

