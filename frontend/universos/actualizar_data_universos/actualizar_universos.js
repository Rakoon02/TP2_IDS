async function actualizar_universos() {
    const id = document.querySelector("#universeDropdown").value;
    const nombre = document.querySelector("#nombre").value;
    const creador = document.querySelector("#creador").value;
    const fecha = document.querySelector("#fecha").value;
    const descripcion = document.querySelector("#descripcion").value;
    const imagen = document.querySelector("#imagen").value;


    if (!id || !nombre || !creador || !fecha || !descripcion || !imagen) {
        alert("Completa todos los campos obligatorios.");
        return;
    }

    const universo = {
        id: parseInt(id),
        nombre,
        creador,
        fecha,
        descripcion,
        imagen
    };

    try {
        const response = await fetch("http://localhost:3000/api/universos/", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(universo)
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || "Error al actualizar el univero.1");
        }

        alert("Universo actualizado exitosamente.");
        window.location.href = "../index.html";
    } catch (error) {
        console.error("Error al actualizar el universo:", error);
        alert("Error al actualizar el universo.2");
    }
}
