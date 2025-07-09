window.addEventListener('DOMContentLoaded', () => {
	fetch('http://localhost:3000/api/personajes/aleatorio')
	.then(res => res.json())
	.then(personaje => {
		document.getElementById('imagen-personaje').src = personaje.imagen;
		document.getElementById('nombre-personaje').textContent = personaje.nombre;
		document.getElementById('serie-personaje').textContent = personaje.nombre_universo;
		document.getElementById('poder-personaje').textContent = personaje.poder;
		document.getElementById('descripcion-personaje').textContent = personaje.descripcion;
	      })
	      .catch(err => {
		      console.error("Error al cargar el personaje:", err);
	      });
});
