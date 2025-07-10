async function update_char() {
    const id = document.querySelector("#characterDropdown").value;
    const nombre = document.querySelector(".nombre").value;
    const origen_id = document.querySelector("#universeDropdown").value;
    const poder = document.querySelector(".poder").value;
    const descripcion = document.querySelector(".descripcion").value;
    const imagen = document.querySelector(".imagen").value;


    if (!id || !nombre || !origen_id || !poder || !descripcion) {
        alert("Completa todos los campos obligatorios.");
        return;
    }

    const personaje = {
        id: parseInt(id),
        nombre: nombre,
        origen_id: parseInt(origen_id),
        poder: poder,
        descripcion: descripcion,
        imagen: imagen
    };

    try {
        const response = await fetch("http://localhost:3000/api/personajes/", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(personaje)
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || "Error al actualizar el personaje.");
        }

        alert("Personaje actualizado exitosamente.");
        window.location.href = "../index.html";
    } catch (error) {
        console.error("Error al actualizar el personaje:", error);
        alert("Error al actualizar el personaje.");
    }
}
