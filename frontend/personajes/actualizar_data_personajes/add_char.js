function add_char() {
    const name = document.querySelector(".name").value;
    const universe = document.getElementById("characterDropdown").value;
    const power = document.querySelector(".power").value;
    const description = document.querySelector(".description").value;
    const image = document.querySelector(".image").value;

    if (!name || !universe || !power || !description || !image) {
        alert("Completa todos los campos obligatorios.");
        return;
    }

    const personaje = {
        nombre: name,
        origen_id: parseInt(universe),
        descripcion: description,
        poder: power,
        imagen: image
    };

    fetch("http://localhost:3000/api/personajes/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(personaje)
    })
    .then(response => response.json())
    .then(data => {
        alert("Personaje añadido exitosamente.");
        window.location.href = "../index.html";
    })
    .catch(error => {
        console.error("Error al añadir el personaje:", error);
        alert("Error al añadir el personaje.");
    });
}