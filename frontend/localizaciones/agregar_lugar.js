async function agregar_lugar() {
    const name = document.querySelector("#nombre").value;
    const description = document.querySelector("#descripcion").value;
    const universe = document.querySelector("#universeDropdown").value;
    const type = document.querySelector("#tipo").value;
    const image = document.querySelector("#imagen").value;

    if (!name || !description || !universe || !type || !image) {
        alert("Completa todos los campos obligatorios.");
        return;
    }

    const lugar = {
        nombre: name,
        descripcion: description,
        origen_id: parseInt(universe), 
        tipo: type,
        imagen: image
    };

    try {
        const response = await fetch("http://localhost:3000/api/lugares/", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(lugar)
        });

        if (!response.ok) {
            throw new Error("Error al añadir el lugar.");
        }

        alert("Lugar añadido exitosamente.");
        window.location.href = "index.html";
    } catch (error) {
        console.error("Error:", error);
        alert("Error al añadir el lugar.");
    }
}
