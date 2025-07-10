async function agregar_universos() {
    const name = document.querySelector("#nombre").value;
    const creator = document.querySelector("#creador").value;
    const date = document.querySelector("#fecha").value;
    const description = document.querySelector("#descripcion").value;
    const image = document.querySelector("#imagen").value;

    if (!name || !creator || !date || !description || !image) {
        alert("Completa todos los campos obligatorios.");
        return;
    }

    const universo = {
        nombre: name,
        creador: creator,
        fecha: date,
        descripcion: description,
        imagen: image
    };

    fetch("http://localhost:3000/api/universos/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(universo)
    })
    .then(response => response.json())
    .then(data => {
        alert("Universo añadido exitosamente.");
        window.location.href = "../index.html";
    })
    .catch(error => {
        console.error("Error al añadir el universo:", error);
        alert("Error al añadir el universo.");
    });
}

